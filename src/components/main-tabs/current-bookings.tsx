import { useAtomValue } from 'jotai';
import { BookingStatus, IBooking } from '~/services/booking-service';
import { currentBookingsAtom } from '~/services/state-atoms';

const CurrentBookings = () => {
    const currentBookings: IBooking[] = useAtomValue(currentBookingsAtom);
    // filter for status === 'current'
    const filteredBookings = currentBookings.filter(
        (booking) => booking.status === BookingStatus.Confirmed
    );

    return (
        <div className="flex flex-col gap-5">
            {filteredBookings.map((booking) => (
                <div key={booking.id} className="flex flex-col gap-5">
                    <p className="text-white text-center">Booking</p>
                    <p className="text-white text-center">{booking.id}</p>
                    <p className="text-white text-center">{booking.status}</p>
                </div>
            ))}
        </div>
    );
};

export default CurrentBookings;
