import { useAtomValue } from 'jotai';
import { SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { IBookingView } from '~/services/booking-service';
import { allBookingsAtom, loadingAtom } from '~/state/state-atoms';

import BookingCard from '../bookings/booking-card';
import Ghost from '../ghost';
import { Input } from '../ui/input';
import AppCardSkeleton from './app-card-skeleton';

const HistoryBookings = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');
    const allBookings = useAtomValue(allBookingsAtom);
    const isLoading = useAtomValue(loadingAtom);
    const currentBookings: IBookingView[] = allBookings.filter((b) =>
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
            <div className="flex h-full  overflow-auto flex-col gap-5">
                {isLoading ? (
                    <AppCardSkeleton />
                ) : currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))
                ) : (
                    <div>
                        <h1 className="text-lg text-center">
                            {search.length > 0 ? 'Not found' : 'Nothing here!!!'}
                        </h1>
                        <Ghost />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryBookings;
