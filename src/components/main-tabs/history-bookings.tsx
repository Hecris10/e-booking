import { useAtomValue } from 'jotai';
import { IBookingView } from '~/services/booking-service';
import { allBookingsAtom } from '~/services/state-atoms';
import BookingCard from './bookings/booking-card';

const HistoryBookings = () => {
    const allBookings: IBookingView[] = useAtomValue(allBookingsAtom);
    // filter for status === 'pending'

    return (
        <div className="flex flex-col gap-5">
            {allBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    );
};

export default HistoryBookings;
