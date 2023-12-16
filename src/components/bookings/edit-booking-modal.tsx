'use client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';

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

import { BookingStatus, IBookingView } from '~/services/booking-service';
import {
    editBookingAtom,
    getUnavailableDatesAtom,
    updateBookAtom,
    userAtom,
} from '~/services/state-atoms';
import { getCardStatusColor } from './badge-utils';
import { BookingStatusComboBox } from './booking-status-combox';
import ConfirmBookingModalDialog from './confirm-booking-modal';

const EditBookingModal = () => {
    const [bookingEdit, setBookingEdit] = useAtom(editBookingAtom);
    const booking = bookingEdit?.booking;
    const userId = useAtomValue(userAtom)?.id;
    const getUnavaiableDates = useSetAtom(getUnavailableDatesAtom);
    const updateBooking = useSetAtom(updateBookAtom);
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
            return setPeriod(newPeriod);
        }
        if (newPeriod && newPeriod.from && newPeriod.to && blockedDates) {
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
            const res = getUnavaiableDates(booking!.placeId);
            setBlockedDates(Array.from(res));
        };
        if (booking && userId) getBlockedDates();
    }, [booking, userId, getUnavaiableDates]);

    const handleBookingUpdate = (rate?: number) => {
        if (booking && period?.from && period?.to && status) {
            const dataReq: IBookingView = {
                ...booking,
                startDate: period.from.toISOString(),
                endDate: period.to.toISOString(),
                status: status,
            };
            updateBooking(dataReq, rate);

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
                    'sm:max-w-[425px] w-[95%] transition-all duration-1000',
                    bgColor,
                    borderColor
                )}>
                <DialogHeader>
                    <DialogTitle>Edit your Booking</DialogTitle>
                    <DialogDescription className="text-lg font-bold">
                        {booking?.placeName}
                    </DialogDescription>
                    <DialogDescription className="italic">
                        {booking?.placeDescription}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-1 w-full">
                    <Image
                        className="rounded-md w-full h-full"
                        alt={booking?.placeName || ''}
                        width={300}
                        priority
                        height={125}
                        src={booking?.placeImages[0] || ''}
                    />
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
                        className="bg-transparent border-none hover:border hover:border-gray hover:shadow-md"
                        variant={'ghost'}
                        onClick={() => setBookingEdit(undefined)}>
                        Close
                    </Button>
                    <ConfirmBookingModalDialog
                        startDate={period?.from}
                        isDanger={status === BookingStatus.Canceled}
                        endDate={period?.to}
                        confirmAction={(rate) => handleBookingUpdate(rate)}
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
