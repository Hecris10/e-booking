import { useAtomValue } from 'jotai';
import { SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { BookingStatus, IBookingView } from '~/services/booking-service';
import { allBookingsAtom, loadingAtom } from '~/state/state-atoms';
import BookingCard from '../bookings/booking-card';
import BookinCardsSkeleton from '../bookings/booking-card-skeleton';
import AddNewBooking from '../bookings/create-booking/add-new-booking';
import { Input } from '../ui/input';

const CurrentBookings = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');
    const loading = useAtomValue(loadingAtom);
    const allBookings = useAtomValue(allBookingsAtom);
    const currentBookings: IBookingView[] = allBookings.filter(
        (b) =>
            (b.status === BookingStatus.Confirmed || b.status === BookingStatus.Pending) &&
            b.placeName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={'flex w-full flex-col gap-2 border border-gray'}>
            <div className={cn('relative w-full flex items-center')}>
                <SearchIcon
                    onClick={() => inputRef.current?.focus()}
                    className="absolute h-4 w-4 m-2 cursor-pointer"
                />
                <Input
                    ref={inputRef}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={'Search...'}
                    className="pl-8 rounded-3xl"
                />
            </div>
            <div className="w-full max-h-[75vh] overflow-auto grid grid-cols-1 gap-2">
                {loading ? (
                    <BookinCardsSkeleton />
                ) : currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))
                ) : search.length === 0 ? (
                    <AddNewBooking />
                ) : (
                    <div>
                        <h1 className="text-lg text-center italic">Not found</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentBookings;
