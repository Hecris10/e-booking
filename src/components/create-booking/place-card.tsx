import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn, formatNumberToUSD, getPlaceRate } from '~/lib/utils';
import { IPlace } from '~/services/place-service';
import { dispatchPlaceAtom } from '~/services/state-atoms';
import RateStars from '../rate-stars';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// card to hold place info and offer to book

const PlaceCard = ({ place }: { place: IPlace }) => {
    const setSelectedPlace = useSetAtom(dispatchPlaceAtom);
    // const isSelected = selected?.id === place.id;

    const searchParams = useSearchParams();

    const router = useRouter();
    const placeParam = searchParams.get('place');
    const isSelected = placeParam === place.id.toString();

    const handleCardClick = () => {
        router.push(`/app?place=${place.id}`);
    };

    const handleSelection = () => {
        setSelectedPlace(place);
    };

    const currentRate = getPlaceRate(place);

    return (
        <Popover>
            <PopoverTrigger>
                <article
                    onClick={() => !isSelected && handleCardClick()}
                    className={cn(
                        'bg-white py-2 px-4 w-full rounded-lg cursor-pointer transition-all duration-300 transform scale-95',
                        isSelected && 'scale-100 shadow-2xl cursor-default'
                    )}>
                    <h1 className="text-lg text-left font-bold">{place.name}</h1>
                    <Image
                        className="w-full mx-auto rounded-lg"
                        alt={place.name}
                        width={300}
                        height={300}
                        src={place.images[0]}
                    />
                    <div>
                        <div className="flex flex-col align-top gap-2 mt-3">
                            <RateStars defaultRate={currentRate} isSelectable={false} />
                            <h2 className="text-lg text-left font-bold">
                                {formatNumberToUSD(place.pricePerNight)}
                                <span className="font-normal text-sm italic">{` per night`}</span>
                            </h2>
                        </div>
                    </div>
                </article>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <p>{place.description}</p>
                </div>
                <Button onClick={handleSelection} className="w-full" predefinition="login">
                    Select
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default PlaceCard;
