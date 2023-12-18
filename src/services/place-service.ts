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
    {
        id: '2',
        name: 'Yuca Valley',
        type: PlaceType.House,
        description:
            'Yucca Valley Oasis w/ Private Hot Tub! is located in Yucca Valley. The air-conditioned accommodation is 29 km from Palm Springs, and guests benefit from private parking available on site and free WiFi.',
        pricePerNight: 200,
        rates: [{ bookingId: 45, placeId: '2', rate: 2 }],
        images: [
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/front-1kQJkGdG9ZehC5UiU4KvPPcLiIqsXr.png',
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/2-MNpbHOj9oZ9L6fmWX95irjB4f8gkoi.png',
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/3-tYZHJu7X2Wl1OwAO2jkJ7kaYbsnXnM.png',
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/4-zG7spOGmQOwx0f4yeoUzYke247nPr6.png',
            'https://y0hbjiz1v2x58pmn.public.blob.vercel-storage.com/5-YwRjwVveo2FqyRxylVULjI6UiLljwn.png',
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
