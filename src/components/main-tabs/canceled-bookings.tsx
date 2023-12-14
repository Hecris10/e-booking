import { useAtomValue } from 'jotai';
import { BookingStatus, IBookingView } from '~/services/booking-service';

import { allBookingsAtom } from '~/services/state-atoms';
import BookingCard from './bookings/booking-card';

const CanceledBookings = () => {
    const canceledBookings: IBookingView[] = useAtomValue(allBookingsAtom).filter(
        (b) => b.status === BookingStatus.Canceled
    );

    return (
        <div className='className="flex h-full max-h-[80vh]  pb-4 overflow-auto flex-col gap-5"'>
            <div className="flex h-full  overflow-auto flex-col gap-5">
                {canceledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    );
};

export default CanceledBookings;
