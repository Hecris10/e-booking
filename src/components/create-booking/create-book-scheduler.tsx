import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';

import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { calculateRangeQuantity, cn, formatNumberToUSD, isDatesConfliting } from '~/lib/utils';
import { IScheduleNewBooking } from '~/services/booking-service';

import {
    createBookingTabPosAtom,
    getUnavailableDatesAtom,
    mainTabAtom,
    newBookAtom,
    selectedPlaceAtom,
    userAtom,
} from '~/services/state-atoms';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ConfirmBookingModalDialog from '../bookings/confirm-booking-modal';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import Carousel from '../ui/carousel';
import DateRangePicker from '../ui/date-range-picker';
import { toast } from '../ui/use-toast';

const CreateBookScheduler = () => {
    const router = useRouter();
    const place = useAtomValue(selectedPlaceAtom);
    const setSelectedBookTab = useSetAtom(createBookingTabPosAtom);
    const [selectedMainTab, setSelectedMainTab] = useAtom(mainTabAtom);
    const getUnavaiableDates = useSetAtom(getUnavailableDatesAtom);
    const setNewBooking = useSetAtom(newBookAtom);
    const userId = useAtomValue(userAtom)?.id;
    const [period, setPeriod] = useState<DateRange | undefined>(undefined);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);

    // calculate total days from period

    const daysQuantity = calculateRangeQuantity(period);
    const total = place?.pricePerNight ? place.pricePerNight * daysQuantity : 0;

    const handleSelect = async (newPeriod: DateRange) => {
        if (!newPeriod || !newPeriod.from || !newPeriod.to) {
            console.log('newPeriod', newPeriod);
            return setPeriod(newPeriod);
        }
        if (newPeriod && newPeriod.from && newPeriod.to && blockedDates) {
            console.log('Blocked dates', blockedDates);

            const isInRage = isDatesConfliting(newPeriod.from, newPeriod.to, blockedDates);

            if (isInRage) {
                toast({
                    description: "You can't book in this period, please select another one.",
                });
                return setPeriod(undefined);
            }
            return setPeriod(newPeriod);
        } else {
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
                pricePerNight: place.pricePerNight,
                totalPrice: total,
            };

            setNewBooking(reqBody);
            setSelectedMainTab('current');
            setSelectedBookTab('select');
            router.push('/app');
            toast({
                description: 'Booking created successfully',
                type: 'background',
            });
        }
    };

    useEffect(() => {
        const getBlockedDates = async () => {
            const res = getUnavaiableDates(place!.id);
            setBlockedDates(Array.from(res));
        };
        if (place && userId) getBlockedDates();
    }, [place, userId, getUnavaiableDates, selectedMainTab]);

    return (
        <>
            <Button
                onClick={() => setSelectedBookTab('select')}
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
                            {place?.images.map((image, index) => (
                                <div className="w-full md:h-[400px]" key={index}>
                                    <Image
                                        className="mx-auto rounded-lg w-full h-full md:object-scale-down"
                                        alt={place?.name}
                                        src={image}
                                        width={800}
                                        height={500}
                                        priority
                                    />
                                </div>
                            )) || <></>}
                        </Carousel>

                        <div className="flex justify-start py-3 pl-2 align-middle absolute w-full bg-ghost">
                            <h1 className="text-2xl text-left text-slate-500 font-bold p-1">
                                {place?.name}
                            </h1>
                        </div>
                    </div>

                    <p>{place?.description}</p>

                    <div className={cn(' text-white text-center py-2')}>
                        <h2 className={cn('text-xl font-bold')}>
                            Select dates that best fits for you!!!
                        </h2>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row overflow-hidden shadow-md rounded-md p-1 pb-2 align-top">
                    <div className="h-auto md:h-[350px]">
                        <DateRangePicker
                            className="md:hidden lg:hidden"
                            placeHolder="Pick a period"
                            disabledDates={blockedDates}
                            disableBefore
                            date={period}
                            onSelect={(d) => handleSelect(d as DateRange)}
                        />
                        <div className="shadow-md overflow-hidden rounded-md p-0">
                            <Calendar
                                mode="range"
                                selected={period}
                                numberOfMonths={1}
                                onSelect={(d) => handleSelect(d as DateRange)}
                                className="rounded-md w-full border bg-white  hidden md:block lg:hidden"
                                disabledDates={blockedDates}
                                disableBefore
                            />
                            <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={period}
                                onSelect={(d) => handleSelect(d as DateRange)}
                                className="rounded-md w-full border bg-white hidden md:hidden lg:block"
                                disabledDates={blockedDates}
                                disableBefore
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full px-4 justify-between ">
                        <div className="flex flex-col gap-3 w-full mb-4 md:mb-0 lg:mb-0">
                            <div>
                                <div>Costs</div>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Price per day:</span>
                                <Badge className="font-medium text-black bg-white hover:bg-white shadow-md">
                                    {formatNumberToUSD(place?.pricePerNight ?? 0)}
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
                                text={`Attention: You have 24 hours before the start date ${period?.from?.toLocaleDateString()} to confirm your booking`}
                                confirmText={'Continue'}
                                isCancel
                                headerText={'Are you sure?'}
                            />
                        }
                    </div>
                </div>
            </article>
        </>
    );
};

export default CreateBookScheduler;
