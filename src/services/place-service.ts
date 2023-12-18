import { StaticImageData } from 'next/image';
import Copa1Img from '~/../public/places/copa-cabana/copa1.png';
import Copa2Img from '~/../public/places/copa-cabana/copa2.png';
import Copa3Img from '~/../public/places/copa-cabana/copa3.png';
import Guoman2Img from '~/../public/places/guoman/2.png';
import Guoman1Img from '~/../public/places/guoman/front.png';
import Shangri2Img from '~/../public/places/shagri-la/2.png';
import Shangri3Img from '~/../public/places/shagri-la/3.png';
import Shangri4Img from '~/../public/places/shagri-la/4.png';
import Shangri5Img from '~/../public/places/shagri-la/5.png';
import Shangri1Img from '~/../public/places/shagri-la/front.png';
import Yuca2Img from '~/../public/places/yuca/2.png';
import Yuca3Img from '~/../public/places/yuca/3.png';
import Yuca4Img from '~/../public/places/yuca/4.png';
import Yuca5Img from '~/../public/places/yuca/5.png';
import Yuca1Img from '~/../public/places/yuca/front.png';

export interface IPlace {
    id: string;
    name: string;
    type: PlaceType;
    description: string;
    pricePerNight: number;
    rates: IRatePlace[];
    images: StaticImageData[];
}

export interface IRatePlace {
    bookingId: number;
    placeId: string;
    rate: number;
}
interface IBlockDate {
    id: number;
    startDate: string;
    endDate: string;
}

export enum PlaceType {
    House = 'house',
    Apartment = 'apartment',
    Hotel = 'hotel',
}

export const PlaceTypeKeys = Object.keys(PlaceType);
export const PlaceTypeValues = Object.values(PlaceType);

export const initialPlaces: IPlace[] = [
    {
        id: '1',
        name: 'Copa Cabana Palace',
        type: PlaceType.Hotel,
        description:
            'Facing Copacabana Beach, this refined art deco hotel from 1923 is 10 km from Santos Dumont Airport and 13 km from the iconic Christ the Redeemer statue.',
        pricePerNight: 1599,
        rates: [{ bookingId: 1, placeId: '1', rate: 5 }],
        images: [Copa1Img, Copa2Img, Copa3Img],
    },
    {
        id: '2',
        name: 'Yuca Valley',
        type: PlaceType.House,
        description:
            'Yucca Valley Oasis w/ Private Hot Tub! is located in Yucca Valley. The air-conditioned accommodation is 29 km from Palm Springs, and guests benefit from private parking available on site and free WiFi.',
        pricePerNight: 200,
        rates: [{ bookingId: 45, placeId: '2', rate: 2 }],
        images: [Yuca1Img, Yuca2Img, Yuca3Img, Yuca4Img, Yuca5Img],
    },
    {
        id: '3',
        name: 'Guoman Tower Hotel',
        type: PlaceType.Hotel,
        description:
            'The Guoman Tower Hotel is a 5-star hotel near the River Thames, opposite the Tower of London and Tower Bridge. The modern air-conditioned rooms have en-suite bathrooms and a flat-screen TV with Freeview.',
        pricePerNight: 2500,
        rates: [{ bookingId: 2, placeId: '3', rate: 5 }],
        images: [Guoman1Img, Guoman2Img],
    },
    {
        id: '4',
        name: 'Shangri-La Hotel',
        type: PlaceType.Hotel,
        description:
            'Overlooking the River Thames and the London Eye, the Shangri-La Hotel, At The Shard, London offers 5-star luxury and breathtaking views of the capital and beyond. ',
        pricePerNight: 3000,
        rates: [{ bookingId: 3, placeId: '4', rate: 5 }],
        images: [Shangri1Img, Shangri2Img, Shangri3Img, Shangri4Img, Shangri5Img],
    },
];

export function getPlacesLocalStorage(): IPlace[] {
    const places = localStorage.getItem('places');
    return places ? JSON.parse(places) : [];
}

export function setPlacesLocalStorage(places: IPlace[]) {
    localStorage.setItem('places', JSON.stringify(places));
}
