'use client';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
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
import { cn, formatNumberToUSD } from '~/lib/utils';

import { BookingStatus } from '~/services/booking-service';
import { useEditBooking } from '../custom-hooks/useEditBooking';
import { BookingStatusComboBox } from './booking-status-combox';
import ConfirmBookingModalDialog from './confirm-booking-modal';

const EditBookingModal = () => {
    const {
        status,
        setStatus,
        booking,
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
    } = useEditBooking();
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
                            disableBefore
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
                <DialogFooter className="w-full flex gap-2 justify-end">
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
