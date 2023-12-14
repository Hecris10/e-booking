import { useState } from 'react';
import { LeftChevIcon } from '~/components/icons/left-chev';
import { cn } from '~/lib/utils';
import { IBookingView, updateBookingDatesLocalStorage } from '~/services/booking-service';
import { getCardStatusBadge, getCardStatusColor } from './badge-utils';

const BookingCard = ({ booking }: { booking: IBookingView }) => {
    const { transparentColor, highlightColor } = getCardStatusColor(booking.status);
    const [isEditing, setIsEditing] = useState(false);

    const updateBookingDates = async (startDate: Date, endDate: Date) => {
        await updateBookingDatesLocalStorage(
            booking.id,
            startDate.toISOString(),
            endDate.toISOString()
        );
    };

    return (
        <article
            className={cn(
                'bg-cardwhite border rounded-3xl overflow-hidden shadow-lg',
                highlightColor
            )}>
            <div className={cn('flex gap-9 py-3 h-full', transparentColor)}>
                <div className="w-[20px] py-1 px-3 h-full my-auto">
                    <LeftChevIcon className="h-[80px] w-[40px] my-auto p-2 rounded-lg cursor-pointer hover:scale-105 hover:bg-slate-50 active:scale-95" />
                </div>
                <div className="w-full">
                    <h1 className="font-bold text-titlecolor">{booking.placeName}</h1>

                    <div className="flex gap-4">
                        <div>
                            <h3>{`Start`}</h3>

                            <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3>{`End`}</h3>
                            <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="mr-6 h-full my-auto ">{getCardStatusBadge(booking.status)}</div>
            </div>
        </article>
    );
};

export default BookingCard;
