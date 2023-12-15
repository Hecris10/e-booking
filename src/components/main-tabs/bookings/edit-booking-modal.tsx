'use client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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
import { calculateRangeQuantity, formatNumberToUSD } from '~/lib/utils';
import {
    IScheduleUpdateBooking,
    updateScheduleBookingLocalStorage,
} from '~/services/booking-service';
import {
    addBlockedDateLocalStorage,
    getPlaceUnavailableDatesLocalStorage,
    removedBlockedDateLocalStorage,
} from '~/services/place-service';
import { editBookingAtom, updateBookingsAtom, userAtom } from '~/services/state-atoms';
import ConfirmBookingModalDialog from './confirm-booking-modal';

const EditBookingModal = () => {
    const [booking, setBooking] = useAtom(editBookingAtom);
    const userId = useAtomValue(userAtom)?.id;
    const updateBookings = useSetAtom(updateBookingsAtom);
    const [blockedDates, setBlockedDates] = useState<Date[] | undefined>(undefined);
    const [period, setPeriod] = useState<DateRange | undefined>(
        booking
            ? ({
                  from: new Date(booking!.startDate),
                  to: new Date(booking?.endDate),
              } as DateRange)
            : undefined
    );
    const blockedDateId = useRef<number>(0);

    const handleSelect = async (newPeriod: DateRange) => {
        if (!newPeriod || !newPeriod.from || !newPeriod.to) {
            if (blockedDateId.current !== 0 && booking)
                removedBlockedDateLocalStorage(booking.placeId, blockedDateId.current);
            blockedDateId.current = 0;
            return setPeriod(newPeriod);
        }

        if (blockedDates && booking && newPeriod && newPeriod.from && newPeriod.to) {
            const blockedDateInRange = blockedDates.some(
                (blockedDate) => blockedDate >= newPeriod.from! && blockedDate <= newPeriod.to!
            );

            if (!blockedDateInRange) {
                if (newPeriod.from && newPeriod.to) {
                    const blockedId = await addBlockedDateLocalStorage({
                        placeId: booking.id.toString(),
                        startDate: newPeriod.from,
                        endDate: newPeriod.to,
                    });
                    blockedDateId.current = blockedId!;
                } else {
                    await removedBlockedDateLocalStorage(booking.placeId, blockedDateId.current);
                    blockedDateId.current = 0;
                }

                return setPeriod(newPeriod);
            }
            toast({
                description: "You can't book in this period, please select another one.",
            });
        } else {
            if (newPeriod.from && newPeriod.to && booking)
                await addBlockedDateLocalStorage({
                    placeId: booking?.placeId.toString(),
                    startDate: newPeriod.from,
                    endDate: newPeriod.to,
                });
            else if (blockedDateId.current && booking)
                await removedBlockedDateLocalStorage(booking?.placeId, blockedDateId.current);
            blockedDateId.current = 0;
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

            const resAsArray = Array.from(res);
            setBlockedDates(resAsArray);
        };
        if (booking && userId) getBlockedDates();
    }, [booking, userId]);

    const updateBooking = async () => {
        if (booking && period?.from && period?.to) {
            const dataReq: IScheduleUpdateBooking = {
                id: booking.id,
                startDate: period.from,
                endDate: period.to,
                pricePerNight: booking.pricePerNight,
                totalPrice: totalPrice,
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
                <div className="grid gap-4 py-4">
                    <Image alt="" src={PlaceImage} />
                    <DateRangePicker date={period} onSelect={setPeriod} disabled={blockedDates} />
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
