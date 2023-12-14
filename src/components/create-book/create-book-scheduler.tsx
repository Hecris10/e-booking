import { useAtomValue, useSetAtom } from 'jotai/react';

import { BookMarkedIcon, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import PlaceImage from '~/../public/hotel.webp';
import { cn, formatNumberToUSD } from '~/lib/utils';
import { getPlaceUnavailableDatesLocalStorage } from '~/services/place-service';
import { createBookingTabPosAtom, selectedPlaceAtom, userAtom } from '~/services/state-atoms';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import Carousel from '../ui/carousel';
import DateRangePicker from '../ui/date-range-picker';
import { toast } from '../ui/use-toast';

const CreateBookScheduler = () => {
    const place = useAtomValue(selectedPlaceAtom);
    const setSelectedTab = useSetAtom(createBookingTabPosAtom);
    const userId = useAtomValue(userAtom)?.id;
    const [period, setPeriod] = useState<DateRange | undefined>(undefined);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);

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

    const handleSelect = (newPeriod: DateRange) => {
        if (blockedDates && newPeriod && newPeriod.from && newPeriod.to) {
            const blockedDateInRange = blockedDates.some(
                (blockedDate) => blockedDate >= newPeriod.from! && blockedDate <= newPeriod.to!
            );

            if (!blockedDateInRange) {
                return setPeriod(newPeriod);
            }

            toast({
                description: "You can't book in this period, please select another one.",
            });
        } else {
            setPeriod(newPeriod);
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
                    'bg-white mt-3 border rounded-3xl overflow-hidden shadow-lg py-3 px-3'
                )}>
                <div>
                    <h1 className="text-lg text-left font-bold">{place?.name}</h1>
                    <Carousel>
                        <Image alt="" src={PlaceImage} />
                        <Image alt="" src={PlaceImage} />
                        <Image alt="" src={PlaceImage} />
                        <Image alt="" src={PlaceImage} />
                    </Carousel>
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
                    <div className="flex flex-col w-full px-2 justify-between ">
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
                        <Button predefinition="login" className="mt-8" variant="default">
                            <BookMarkedIcon className="mr-1 h-4 w-4 -translate-x-1" />
                            Confirm
                        </Button>
                    </div>
                </div>
            </article>
        </>
    );
};

export default CreateBookScheduler;
