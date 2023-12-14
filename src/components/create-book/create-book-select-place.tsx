import { useAtomValue } from 'jotai';
import { SearchIcon } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '~/lib/utils';
import { IPlace } from '~/services/place-service';
import { placesAtom } from '~/services/state-atoms';
import { Input } from '../ui/input';
import PlaceCard from './place-card';

export const SelectPlace = () => {
    const places: IPlace[] = useAtomValue(placesAtom);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredPlaces = places.filter((place) => place.name.includes(''));

    return (
        <section className={'flex w-full flex-col'}>
            <div className={cn('relative w-full flex items-center')}>
                <SearchIcon
                    onClick={() => inputRef.current?.focus()}
                    className="absolute h-4 w-4 m-2 cursor-pointer"
                />
                <Input
                    ref={inputRef}
                    placeholder={'Search the best place for you...'}
                    className="pl-8 rounded-3xl"
                />
            </div>
            <div className="w-full">
                {filteredPlaces.map((place) => (
                    <PlaceCard place={place} key={place.id} />
                ))}
            </div>
        </section>
    );
};
