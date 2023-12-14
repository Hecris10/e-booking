import { useAtomValue, useSetAtom } from 'jotai/react';

import { BookMarkedIcon, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import PlaceImage from '~/../public/hotel.webp';
import { cn, formatNumberToUSD } from '~/lib/utils';
import { IScheduleNewBooking, scheduleBookingLocalStorage } from '~/services/booking-service';
import {
    addBlockedDateLocalStorage,
    getPlaceUnavailableDatesLocalStorage,
    removedBlockedDateLocalStorage,
} from '~/services/place-service';
import {
    createBookingTabPosAtom,
    selectedPlaceAtom,
    updateBookingsAtom,
    userAtom,
} from '~/services/state-atoms';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import Carousel from '../ui/carousel';
import DateRangePicker from '../ui/date-range-picker';
import { toast } from '../ui/use-toast';

const CreateBookScheduler = () => {
    const place = useAtomValue(selectedPlaceAtom);
    const setSelectedTab = useSetAtom(createBookingTabPosAtom);
    const updateBookins = useSetAtom(updateBookingsAtom);
    const userId = useAtomValue(userAtom)?.id;
    const [period, setPeriod] = useState<DateRange | undefined>(undefined);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);
    const blockedDateId = useRef<number>(0);

    // calculate total days from period
    const calculateRangeQuantity = () => {
        if (period && period.from && period.to) {
            // if the period is the same day, return 1
            if (period.from.toDateString() === period.to.toDateString()) return 1;

            const days = Math.abs(period.to.getTime() - period.from.getTime());
            const daysQuantity = Math.ceil(days / (1000 * 60 * 60 * 24));
            return daysQuantity;
        }
        return 0;
    };
    const daysQuantity = calculateRangeQuantity();
    const total = place?.pricePerNight ? place.pricePerNight * daysQuantity : 0;

    const handleSelect = async (newPeriod: DateRange) => {
        if (!newPeriod || !newPeriod.from || !newPeriod.to) {
            if (blockedDateId.current !== 0)
                removedBlockedDateLocalStorage(place!.id, blockedDateId.current);
            blockedDateId.current = 0;
            return setPeriod(newPeriod);
        }

        if (blockedDates && newPeriod && newPeriod.from && newPeriod.to) {
            const blockedDateInRange = blockedDates.some(
                (blockedDate) => blockedDate >= newPeriod.from! && blockedDate <= newPeriod.to!
            );

            if (!blockedDateInRange) {
                if (newPeriod.from && newPeriod.to) {
                    const blockedId = await addBlockedDateLocalStorage({
                        placeId: place!.id.toString(),
                        startDate: newPeriod.from,
                        endDate: newPeriod.to,
                    });
                    blockedDateId.current = blockedId!;
                } else {
                    await removedBlockedDateLocalStorage(place!.id, blockedDateId.current);
                    blockedDateId.current = 0;
                }

                return setPeriod(newPeriod);
            }
            toast({
                description: "You can't book in this period, please select another one.",
            });
        } else {
            if (newPeriod.from && newPeriod.to)
                await addBlockedDateLocalStorage({
                    placeId: place!.id.toString(),
                    startDate: newPeriod.from,
                    endDate: newPeriod.to,
                });
            else if (blockedDateId.current)
                await removedBlockedDateLocalStorage(place!.id, blockedDateId.current);
            blockedDateId.current = 0;
            setPeriod(newPeriod);
        }
    };

    const handleBook = async () => {
        if (period && period.from && period.to && userId && place) {
            const reqBody: IScheduleNewBooking = {
                userId: userId.toString(),
                placeId: place.id,
                startDate: period.from,
                endDate: period.to,
            };

            await scheduleBookingLocalStorage(reqBody);
            await updateBookins();
        }
    };

    useEffect(() => {
        const getBlockedDates = async () => {
            const res = await getPlaceUnavailableDatesLocalStorage(place!.id, userId!);
            setBlockedDates(res);
        };
        if (place && userId) getBlockedDates();
    }, [place, userId]);

    return (
        <>
            <Button
                onClick={() => setSelectedTab('select')}
                predefinition="login"
                className="ml-2"
                variant="default">
                <ChevronLeft className="h-6 w-6 -translate-x-1" />
                Back
            </Button>
            <article
                className={cn(
                    'bg-white mt-3 border rounded-3xl max-h-[74vh] overflow-auto shadow-lg py-3 px-3'
                )}>
                <div>
                    <div className="flex h-full w-full relative">
                        <Carousel>
                            <Image alt="" src={PlaceImage} />
                            <Image alt="" src={PlaceImage} />
                            <Image alt="" src={PlaceImage} />
                            <Image alt="" src={PlaceImage} />
                        </Carousel>
                        <div className="flex justify-start py-3 pl-2 align-middle absolute w-full bg-ghost">
                            <h1 className="text-2xl text-left text-gray font-bold p-1">
                                {place?.name}
                            </h1>
                        </div>
                    </div>

                    <p>{place?.description}</p>
                </div>
                <div className={cn(' text-white text-center py-2')}>
                    <h2 className={cn('text-xl font-bold')}>
                        Select dates that best fits for you!!!
                    </h2>
                </div>
                <div className="w-full flex flex-col md:flex-row overflow-hidden shadow-md rounded-md p-1 pb-2 align-top">
                    <div>
                        <DateRangePicker
                            className="md:hidden lg:hidden"
                            placeHolder="Pick a period"
                            disabled={blockedDates}
                            date={period}
                            onSelect={(d) => handleSelect(d as DateRange)}
                        />
                        <Calendar
                            mode="range"
                            selected={period}
                            numberOfMonths={1}
                            onSelect={(d) => handleSelect(d as DateRange)}
                            className="rounded-md w-full border bg-white  hidden md:block lg:hidden"
                            disabled={blockedDates}
                        />
                        <Calendar
                            mode="range"
                            numberOfMonths={2}
                            selected={period}
                            onSelect={(d) => handleSelect(d as DateRange)}
                            className="rounded-md w-full border bg-white hidden md:hidden lg:block"
                            disabled={blockedDates}
                        />
                    </div>
                    <div className="flex flex-col w-full px-4 justify-between ">
                        <div className="flex flex-col gap-3 w-full">
                            <div>
                                <div>Costs</div>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Price per day:</span>
                                <Badge className="font-medium text-black bg-white hover:bg-white shadow-md">
                                    $100
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-lg">Total:</span>
                                <Badge className=" text-white bg-lightblue  hover:bg-lightblue shadow-md">
                                    {formatNumberToUSD(total)}
                                </Badge>
                            </div>
                        </div>
                        {/* <Button predefinition="login" className="mt-8" variant="default">
                            <BookMarkedIcon className="mr-1 h-4 w-4 -translate-x-1" />
                            Save
                        </Button> */}
                        {
                            <ConfirmBookingModalDialog
                                confirmAction={handleBook}
                                endDate={period?.to}
                                startDate={period?.from}
                            />
                        }
                    </div>
                </div>
            </article>
        </>
    );
};

const ConfirmBookingModalDialog = ({
    startDate,
    endDate,
    confirmAction,
}: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    confirmAction: () => void;
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button predefinition="login" className="mt-8" variant="default">
                    <BookMarkedIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    Save
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-50">
                {startDate && endDate ? (
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">Are sure?</AlertDialogTitle>
                        <AlertDialogDescription className="italic">
                            {`Attention: You have 24 hours before the start date ${startDate.toLocaleDateString()} to confirm your booking`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                ) : (
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            You should select a start and an end date!!!
                        </AlertDialogTitle>
                        {/* <AlertDialogDescription className="italic">
                            {`Attention: You have 24 hours before the start date ${startDate.toLocaleDateString()} to confirm your booking`}
                            .
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>
                )}
                <AlertDialogFooter>
                    {startDate && endDate && (
                        <AlertDialogCancel asChild>
                            <Button
                                className="bg-blue-50 border-none hover:border hover:border-gray hover:shadow-md"
                                variant={'ghost'}>
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                    )}
                    {startDate && endDate ? (
                        <AlertDialogAction
                            onClick={confirmAction}
                            className="bg-yellow text-lightblue">
                            Continue
                        </AlertDialogAction>
                    ) : (
                        <AlertDialogAction className="bg-yellow text-lightblue">
                            Okay
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CreateBookScheduler;
