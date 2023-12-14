import { useAtomValue } from 'jotai';
import { IBookingView } from '~/services/booking-service';
import { currentBookingsAtom } from '~/services/state-atoms';
import BookingCard from './bookings/booking-card';

const CurrentBookings = () => {
    const currentBookings: IBookingView[] = useAtomValue(currentBookingsAtom);

    return (
        <div className='className="flex h-full max-h-[80vh]  pb-4 overflow-auto flex-col gap-5"'>
            <div className="flex h-full  overflow-auto flex-col gap-5">
                {currentBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    );
};

export default CurrentBookings;
