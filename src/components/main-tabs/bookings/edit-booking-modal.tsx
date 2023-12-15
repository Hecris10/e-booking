'use client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import PlaceImage from '~/../public/hotel.webp';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import DateRangePicker from '~/components/ui/date-range-picker';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { toast } from '~/components/ui/use-toast';
import {
    calculateRangeQuantity,
    excludeFromRange,
    formatNumberToUSD,
    isDatesConfliting,
} from '~/lib/utils';
import {
    BookingStatus,
    IScheduleUpdateBooking,
    updateScheduleBookingLocalStorage,
} from '~/services/booking-service';
import { getPlaceUnavailableDatesLocalStorage } from '~/services/place-service';
import { editBookingAtom, updateBookingsAtom, userAtom } from '~/services/state-atoms';
import { BookingStatusComboBox } from './booking-status-combox';
import ConfirmBookingModalDialog from './confirm-booking-modal';

const EditBookingModal = () => {
    const [booking, setBooking] = useAtom(editBookingAtom);
    const userId = useAtomValue(userAtom)?.id;
    const updateBookings = useSetAtom(updateBookingsAtom);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);
    const status = useRef<BookingStatus | undefined>(booking?.status);
    const [period, setPeriod] = useState<DateRange | undefined>(
        booking
            ? ({
                  from: new Date(booking!.startDate),
                  to: new Date(booking?.endDate),
              } as DateRange)
            : undefined
    );

    const filteredBlockedDates = useMemo(() => {
        if (booking && booking.startDate && booking.endDate && blockedDates) {
            return excludeFromRange(
                new Date(booking.startDate),
                new Date(booking.endDate),
                blockedDates
            );
        }
        return blockedDates;
    }, [blockedDates, booking]);

    const handleSelect = async (newPeriod: DateRange) => {
        if (!newPeriod || !newPeriod.from || !newPeriod.to) {
            console.log('newPeriod', newPeriod);
            return setPeriod(newPeriod);
        }
        if (newPeriod && newPeriod.from && newPeriod.to) {
            console.log('Blocked dates', blockedDates);

            const isInRage = isDatesConfliting(newPeriod.from, newPeriod.to, filteredBlockedDates!);
            console.log('isInRage', isInRage);
            if (isInRage) {
                return toast({
                    description: "You can't book in this period, please select another one.",
                });
            }
            return setPeriod(newPeriod);
        } else {
            setPeriod(newPeriod);
        }
    };

    useEffect(() => {
        if (booking) {
            setPeriod({
                from: new Date(booking.startDate),
                to: new Date(booking.endDate),
            });
        } else {
            setPeriod(undefined);
        }
    }, [booking]);

    useEffect(() => {
        const getBlockedDates = async () => {
            const res = await getPlaceUnavailableDatesLocalStorage(booking?.placeId!, userId!);
            let resAsArray = Array.from(res);
            setBlockedDates(resAsArray);
        };
        if (booking && userId) getBlockedDates();
    }, [booking, userId, period]);

    const updateBooking = async () => {
        if (booking && period?.from && period?.to) {
            const dataReq: IScheduleUpdateBooking = {
                id: booking.id,
                startDate: period.from,
                endDate: period.to,
                pricePerNight: booking.pricePerNight,
                totalPrice: totalPrice,
                status: status.current || BookingStatus.Pending,
            };
            await updateScheduleBookingLocalStorage(dataReq);
            await updateBookings();
            toast({
                description: 'Booking updated successfully',
                type: 'background',
            });
        }
    };

    const daysQuantity = calculateRangeQuantity(period);
    const totalPrice =
        booking?.startDate !== period?.to || booking?.endDate !== period?.to
            ? daysQuantity * (booking?.pricePerNight ?? 0)
            : booking?.totalPrice ?? 0;

    return (
        <Dialog open={booking !== undefined}>
            <DialogContent className="sm:max-w-[425px] bg-blue-50">
                <DialogHeader>
                    <DialogTitle>Edit your Booking</DialogTitle>
                    <DialogDescription>{booking?.placeName}</DialogDescription>
                    <DialogDescription>{booking?.placeDescription}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-1 w-full">
                    <Image alt="" src={PlaceImage} />
                    <DateRangePicker
                        date={period}
                        onSelect={(d) => handleSelect(d as DateRange)}
                        disabledDates={filteredBlockedDates}
                    />
                    {booking?.status !== BookingStatus.Completed &&
                    booking?.status !== BookingStatus.Canceled ? (
                        <BookingStatusComboBox
                            status={booking?.status}
                            onChange={(newStatus) => (status.current = newStatus)}
                        />
                    ) : (
                        <div className="mr-0 flex justify-end align-middle">
                            <Badge className=" text-white bg-lightblue  hover:bg-lightblue shadow-md">
                                {booking.status}
                            </Badge>
                        </div>
                    )}
                    <div className="flex flex-col gap-3 w-full">
                        <div>
                            <div>Costs</div>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Price per day:</span>
                            <Badge className="font-medium text-black bg-white hover:bg-white shadow-md">
                                {formatNumberToUSD(booking?.pricePerNight ?? 0)}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-lg">Total:</span>
                            <Badge className=" text-white bg-lightblue  hover:bg-lightblue shadow-md">
                                {formatNumberToUSD(totalPrice)}
                            </Badge>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        className="bg-blue-50 border-none hover:border hover:border-gray hover:shadow-md"
                        variant={'ghost'}
                        onClick={() => setBooking(undefined)}>
                        Close
                    </Button>
                    <ConfirmBookingModalDialog
                        startDate={period?.from}
                        endDate={period?.to}
                        confirmAction={updateBooking}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookingModal;
