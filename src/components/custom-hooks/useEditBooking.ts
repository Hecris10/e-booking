'use client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { toast } from '~/components/ui/use-toast';
import { calculateRangeQuantity, excludeFromRange, isDatesConfliting } from '~/lib/utils';

import { BookingStatus, IBookingView } from '~/services/booking-service';
import {
    editBookingAtom,
    getUnavailableDatesAtom,
    updateBookAtom,
    userAtom,
} from '~/state/state-atoms';
import { getCardStatusColor } from '../bookings/badge-utils';

export const useEditBooking = () => {
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

    return {
        booking,
        status,
        setStatus,
        bookingEdit,
        setBookingEdit,
        bgColor,
        period,
        borderColor,
        filteredBlockedDates,
        handleBookingUpdate,
        handleSelect,
        dialogText,
        totalPrice,
    };
};
