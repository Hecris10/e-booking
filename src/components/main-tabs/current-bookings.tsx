import { useAtomValue } from 'jotai';
import { SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { BookingStatus, IBookingView } from '~/services/booking-service';
import { allBookingsAtom } from '~/services/state-atoms';
import { Input } from '../ui/input';
import BookingCard from './bookings/booking-card';

const CurrentBookings = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');

    const currentBookings: IBookingView[] = useAtomValue(allBookingsAtom)
        .filter((b) => b.status === BookingStatus.Confirmed || b.status === BookingStatus.Pending)
        .filter((booking) => booking.placeName.toLowerCase().includes(search.toLowerCase()));

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
            <div className="flex h-full  overflow-auto flex-col gap-5">
                {currentBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    );
};

export default CurrentBookings;
