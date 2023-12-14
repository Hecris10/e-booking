import { useAtomValue } from 'jotai';
import { IBookingView } from '~/services/booking-service';
import { canceledBookingsAtom } from '~/services/state-atoms';
import BookingCard from './bookings/booking-card';

const CanceledBookings = () => {
    const canceledBookings: IBookingView[] = useAtomValue(canceledBookingsAtom);

    return (
        <div className="flex flex-col gap-5">
            {canceledBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    );
};

export default CanceledBookings;
