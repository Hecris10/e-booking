import { useAtomValue } from 'jotai';
import { IBookingView } from '~/services/booking-service';
import { canceledBookingsAtom } from '~/services/state-atoms';
import BookingCard from './bookings/booking-card';

const CanceledBookings = () => {
    const canceledBookings: IBookingView[] = useAtomValue(canceledBookingsAtom);

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
