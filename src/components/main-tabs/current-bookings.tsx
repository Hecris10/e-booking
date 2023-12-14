import { useAtomValue } from 'jotai';
import { IBookingView } from '~/services/booking-service';
import { currentBookingsAtom } from '~/services/state-atoms';
import BookingCard from './bookings/booking-card';

const CurrentBookings = () => {
    const currentBookings: IBookingView[] = useAtomValue(currentBookingsAtom);

    console.log({ currentBookings });

    return (
        <div className="flex flex-col gap-5">
            {currentBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    );
};

export default CurrentBookings;
