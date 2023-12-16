import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import {
    createBookingTabPosAtom,
    getUnavailableDatesAtom,
    mainTabAtom,
    newBookAtom,
    selectedPlaceAtom,
    userAtom,
} from '~/services/state-atoms';

import { useRouter } from 'next/navigation';
import { calculateRangeQuantity, isDatesConfliting } from '~/lib/utils';
import { IScheduleNewBooking } from '~/services/booking-service';
import { toast } from '../ui/use-toast';

export const useHandleScheduler = () => {
    const router = useRouter();
    const place = useAtomValue(selectedPlaceAtom);
    const setSelectedBookTab = useSetAtom(createBookingTabPosAtom);
    const [selectedMainTab, setSelectedMainTab] = useAtom(mainTabAtom);
    const getUnavaiableDates = useSetAtom(getUnavailableDatesAtom);
    const setNewBooking = useSetAtom(newBookAtom);
    const userId = useAtomValue(userAtom)?.id;
    const [period, setPeriod] = useState<DateRange | undefined>(undefined);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);

    const daysQuantity = calculateRangeQuantity(period);
    const total = place?.pricePerNight ? place.pricePerNight * daysQuantity : 0;

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

    return {
        setSelectedBookTab,
        place,
        blockedDates,
        period,
        handleSelect,
        handleBook,
        total,
    };
};
