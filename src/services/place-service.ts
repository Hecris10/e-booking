export interface IPlace {
    id: string;
    name: string;
    type: PlaceType;
    description: string;
    pricePerNight: number;
    rates: IRatePlace[];
    images: string[];
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
        images: [
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/1-VHBwvwuyv8BGfknSGM481SW0UR7IdB.png',
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/2-5V3LFsYvZIxvcOs5WuFagO1aVd8aZW.png',
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/4-82b7WRmFoMjkQQeBJlWqf9exHQK5dG.png',
        ],
    },
];

export function getPlacesLocalStorage(): IPlace[] {
    const places = localStorage.getItem('places');
    return places ? JSON.parse(places) : [];
}

export function setPlacesLocalStorage(places: IPlace[]) {
    localStorage.setItem('places', JSON.stringify(places));
}
