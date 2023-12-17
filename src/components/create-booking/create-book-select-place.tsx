'use client';
import { useAtomValue } from 'jotai';
import { SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { IPlace } from '~/services/place-service';
import { placesAtom } from '~/services/state-atoms';
import { Input } from '../ui/input';
import PlaceCard from './place-card';

export const SelectPlace = () => {
    const places: IPlace[] = useAtomValue(placesAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    const [seach, setSearch] = useState<string>('');

    const filteredPlaces = places.filter((place) =>
        place.name.toLowerCase().includes(seach.toLowerCase())
    );

    return (
        <section className={'flex w-full flex-col gap-2 border border-gray'}>
            <div className={cn('relative w-full flex items-center')}>
                <SearchIcon
                    onClick={() => inputRef.current?.focus()}
                    className="absolute h-4 w-4 m-2 cursor-pointer"
                />
                <Input
                    ref={inputRef}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={'Search the best place for you...'}
                    className="pl-8 rounded-3xl"
                />
            </div>
            <div className="w-full max-h-[75vh] overflow-auto grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredPlaces.map((place) => (
                    <PlaceCard place={place} key={place.id} />
                ))}
            </div>
        </section>
    );
};
