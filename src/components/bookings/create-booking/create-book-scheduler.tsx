import { ChevronLeft } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn, formatNumberToUSD } from '~/lib/utils';

import Image from 'next/image';
import { useCreateBooking } from '../../custom-hooks/useCreateBooking';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import Carousel from '../../ui/carousel';
import DateRangePicker from '../../ui/date-range-picker';
import ConfirmBookingModalDialog from '../confirm-booking-modal';

const CreateBookScheduler = () => {
    const { setSelectedBookTab, place, blockedDates, period, handleSelect, handleBook, total } =
        useCreateBooking();

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
                                        placeholder="blur"
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
                                <Badge className="bg-white hover:bg-white shadow-md">
                                    <p className="font-medium text-black" id="daily-price">
                                        {formatNumberToUSD(place?.pricePerNight ?? 0)}
                                    </p>
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-lg">Total:</span>
                                <Badge className="bg-lightblue  hover:bg-lightblue shadow-md">
                                    <p className=" text-white" id="daily-price">
                                        {' '}
                                        {formatNumberToUSD(total)}
                                    </p>
                                </Badge>
                            </div>
                        </div>
                        <ConfirmBookingModalDialog
                            confirmAction={handleBook}
                            endDate={period?.to}
                            startDate={period?.from}
                            text={`Attention: You have 24 hours before the start date ${period?.from?.toLocaleDateString()} to confirm your booking`}
                            confirmText={'Continue'}
                            isCancel
                            headerText={'Are you sure?'}
                        />
                    </div>
                </div>
            </article>
        </>
    );
};

export default CreateBookScheduler;
