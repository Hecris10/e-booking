import {
    BookingStatus,
    getBookingsByPlaceLocalStorage,
    getBookinsByUserWithPlaceByStatusLocalStorage,
} from './booking-service';

export interface IPlace {
    id: string;
    name: string;
    type: PlaceType;
    description: string;
    amenities: string[];
    pricePerNight: number;
    blockedDates: IBlockDate[]; // Assuming date format is string for simplicity
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

export const places: IPlace[] = [
    {
        id: '1',
        name: 'House 1',
        type: PlaceType.House,
        description: 'House 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 100,
        blockedDates: [{ id: 1, startDate: '2021-01-01', endDate: '2021-01-02' }],
    },
    {
        id: '2',
        name: 'House 2',
        type: PlaceType.House,
        description: 'House 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 200,
        blockedDates: [{ id: 2, startDate: '2021-01-03', endDate: '2021-01-04' }],
    },
    {
        id: '3',
        name: 'Apartment 1',
        type: PlaceType.Apartment,
        description: 'Apartment 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 300,
        blockedDates: [{ id: 3, startDate: '2021-01-05', endDate: '2021-01-06' }],
    },
    {
        id: '4',
        name: 'Apartment 2',
        type: PlaceType.Apartment,
        description: 'Apartment 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 400,
        blockedDates: [{ id: 4, startDate: '2021-01-07', endDate: '2021-01-08' }],
    },
    {
        id: '5',
        name: 'Hotel 1',
        type: PlaceType.Hotel,
        description: 'Hotel 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 500,
        blockedDates: [{ id: 5, startDate: '2021-01-09', endDate: '2021-01-10' }],
    },
    {
        id: '6',
        name: 'Hotel 2',
        type: PlaceType.Hotel,
        description: 'Hotel 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 600,
        blockedDates: [{ id: 6, startDate: '2021-01-11', endDate: '2021-01-12' }],
    },
];

export function getPlacesLocalStorage(): IPlace[] {
    const places = localStorage.getItem('places');
    return places ? JSON.parse(places) : [];
}

export function setPlacesLocalStorage(places: IPlace[]) {
    localStorage.setItem('places', JSON.stringify(places));
}

export function addPlaceLocalStorage(place: IPlace) {
    const places = getPlacesLocalStorage();
    places.push(place);
    setPlacesLocalStorage(places);
}

export function updatePlaceLocalStorage(place: IPlace) {
    const places = getPlacesLocalStorage();
    const index = places.findIndex((p) => p.id === place.id);
    places[index] = place;
    setPlacesLocalStorage(places);
}

export function deletePlaceLocalStorage(placeId: string) {
    const places = getPlacesLocalStorage();
    const index = places.findIndex((p) => p.id === placeId);
    places.splice(index, 1);
    setPlacesLocalStorage(places);
}

export function getPlaceLocalStorage(placeId: string) {
    const places = getPlacesLocalStorage();
    return places.find((p) => p.id === placeId);
}

export function getPlacesByTypeLocalStorage(type: string) {
    const places = getPlacesLocalStorage();
    return places.filter((p) => p.type === type);
}

export function getPlacesByAmenityLocalStorage(amenity: string) {
    const places = getPlacesLocalStorage();
    return places.filter((p) => p.amenities.includes(amenity));
}

export function getBlockedDatesByPlaceIdLocalStorage(placeId: string) {
    const place = getPlaceLocalStorage(placeId);
    return place ? place.blockedDates : [];
}

export async function getPlaceUnavailableDatesLocalStorage(
    placeId: string,
    userId: number
): Promise<Date[]> {
    const dates: Date[] = [];
    const place = getPlaceLocalStorage(placeId);
    if (place) {
        const bookings = await getBookingsByPlaceLocalStorage(placeId);
        bookings
            .filter((b) => b.placeId === placeId)
            .forEach((b) => {
                const startDate = new Date(b.startDate);
                const endDate = new Date(b.endDate);
                let currentDate = startDate;
                while (currentDate <= endDate) {
                    dates.push(currentDate);
                    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
                }
            });
        console.log('Date1: ', dates);

        place?.blockedDates.forEach((b) => {
            const startDate = new Date(b.startDate);
            const endDate = new Date(b.endDate);
            let currentDate = startDate;
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
            }
        });

        const userBookings = await getBookinsByUserWithPlaceByStatusLocalStorage(userId, [
            BookingStatus.Pending,
            BookingStatus.Confirmed,
        ]);

        userBookings
            .filter((b) => b.placeId === placeId)
            .forEach((b) => {
                const startDate = new Date(b.startDate);
                const endDate = new Date(b.endDate);
                let currentDate = startDate;
                while (currentDate <= endDate) {
                    dates.push(currentDate);
                    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
                }
            });

        console.log('found place: ', place);
        console.log('Date2: ', dates);
        return dates;
    }

    return [];
}
