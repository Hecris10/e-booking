'use client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
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
    cn,
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
import { getCardStatusColor } from './badge-utils';
import { BookingStatusComboBox } from './booking-status-combox';
import ConfirmBookingModalDialog from './confirm-booking-modal';

const EditBookingModal = () => {
    const [bookingEdit, setBookingEdit] = useAtom(editBookingAtom);
    const booking = bookingEdit?.booking;
    const userId = useAtomValue(userAtom)?.id;
    const updateBookings = useSetAtom(updateBookingsAtom);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);
    const [status, setStatus] = useState<BookingStatus | undefined>(booking?.status);

    const [period, setPeriod] = useState<DateRange | undefined>(
        booking
            ? ({
                  from: new Date(booking!.startDate),
                  to: new Date(booking?.endDate),
              } as DateRange)
            : undefined
    );

    const { bgColor, borderColor } = getCardStatusColor(status || BookingStatus.Pending);
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

    const handleConfirm = async () => {
        if (status === BookingStatus.Confirmed) {
            await updateBooking();
        }
    };

    useEffect(() => {
        if (booking) {
            setPeriod({
                from: new Date(booking.startDate),
                to: new Date(booking.endDate),
            });
            setStatus(booking.status);
        } else {
            setPeriod(undefined);
            setStatus(undefined);
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
                status: status || BookingStatus.Pending,
            };
            await updateScheduleBookingLocalStorage(dataReq);
            await updateBookings();
            toast({
                description: 'Booking updated successfully',
                type: 'background',
            });
        }
    };

    const dialogText =
        status === BookingStatus.Confirmed
            ? 'Your booking will be confirmed!'
            : status === BookingStatus.Canceled
            ? `You can't undone this action!`
            : status === BookingStatus.Pending
            ? `Attention: You have 24 hours before the start date ${period?.from?.toLocaleDateString()} to confirm your booking`
            : '';

    const daysQuantity = calculateRangeQuantity(period);
    const totalPrice =
        booking?.startDate !== period?.to || booking?.endDate !== period?.to
            ? daysQuantity * (booking?.pricePerNight ?? 0)
            : booking?.totalPrice ?? 0;

    return (
        <Dialog open={bookingEdit !== undefined && bookingEdit.mode === 'edit'}>
            <DialogContent
                className={cn(
                    'sm:max-w-[425px] transition-all duration-1000',
                    bgColor,
                    borderColor
                )}>
                <DialogHeader>
                    <DialogTitle>Edit your Booking</DialogTitle>
                    <DialogDescription>{booking?.placeName}</DialogDescription>
                    <DialogDescription>{booking?.placeDescription}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-1 w-full">
                    <Image alt="" src={PlaceImage} />
                    {booking?.status !== BookingStatus.Canceled &&
                    booking?.status !== BookingStatus.Completed ? (
                        <DateRangePicker
                            date={period}
                            onSelect={(d) => handleSelect(d as DateRange)}
                            disabledDates={filteredBlockedDates}
                        />
                    ) : (
                        <div className="flex gap-1">
                            <Calendar />{' '}
                            {`${new Date(booking?.startDate).toLocaleDateString()} - ${new Date(
                                booking?.endDate
                            ).toLocaleDateString()}`}{' '}
                        </div>
                    )}
                    {booking?.status !== BookingStatus.Completed &&
                    booking?.status !== BookingStatus.Canceled ? (
                        <BookingStatusComboBox
                            status={status}
                            onChange={(newStatus) => setStatus(newStatus)}
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
                        onClick={() => setBookingEdit(undefined)}>
                        Close
                    </Button>
                    <ConfirmBookingModalDialog
                        startDate={period?.from}
                        endDate={period?.to}
                        confirmAction={updateBooking}
                        isRate={status === BookingStatus.Completed}
                        isCancel
                        headerText={
                            status === BookingStatus.Completed
                                ? 'Share with us your experience'
                                : status === BookingStatus.Confirmed
                                ? 'Confirmed'
                                : 'Are you sure?'
                        }
                        text={dialogText}
                        confirmText={status !== BookingStatus.Completed ? 'Okay' : 'Continue'}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookingModal;
