import { useAtom } from 'jotai';
import Image from 'next/image';
import HotelImage from '~/../public/hotel.webp';
import { cn, formatNumberToUSD } from '~/lib/utils';
import { IPlace } from '~/services/place-service';
import { selectedPlaceAtom } from '~/services/state-atoms';
import RateStars from '../rate-starts';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// card to hold place info and offer to book

const PlaceCard = ({ place }: { place: IPlace }) => {
    const [selected, setSelected] = useAtom(selectedPlaceAtom);
    const isSelected = selected?.id === place.id;

    return (
        <Popover>
            <PopoverTrigger>
                <article
                    onClick={() => !isSelected && setSelected(place)}
                    className={cn(
                        'bg-white py-2 px-4 w-full rounded-lg cursor-pointer transition-all duration-300 transform scale-95',
                        isSelected && 'scale-100 shadow-2xl cursor-default'
                    )}>
                    <h1 className="text-lg text-left font-bold">{place.name}</h1>
                    <Image
                        className="w-full mx-auto rounded-lg"
                        alt={place.name}
                        src={HotelImage}
                    />
                    <div>
                        <div className="flex flex-col align-top gap-2 mt-3">
                            <RateStars defaultRate={0} isSelectable={false} />
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
                <Button className="w-full" predefinition="login">
                    Select
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default PlaceCard;
