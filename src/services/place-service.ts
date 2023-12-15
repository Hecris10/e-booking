import { getDatesFromRange } from '~/lib/utils';
import { getBookingsByPlaceLocalStorage, getBookingsByUserIdLocalStorage } from './booking-service';

export interface IPlace {
    id: string;
    name: string;
    type: PlaceType;
    description: string;
    amenities: string[];
    pricePerNight: number;
    blockedDates: IBlockDate[];
    rates: IRatePlace[];
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

export const places: IPlace[] = [
    {
        id: '1',
        name: 'House 1',
        type: PlaceType.House,
        description: 'House 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 100,
        blockedDates: [{ id: 1, startDate: '2021-01-01', endDate: '2021-01-02' }],
        rates: [{ bookingId: 1, placeId: '1', rate: 5 }],
    },
    {
        id: '2',
        name: 'House 2',
        type: PlaceType.House,
        description: 'House 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 200,
        blockedDates: [{ id: 2, startDate: '2021-01-03', endDate: '2021-01-04' }],
        rates: [{ bookingId: 2, placeId: '2', rate: 4 }],
    },
    {
        id: '3',
        name: 'Apartment 1',
        type: PlaceType.Apartment,
        description: 'Apartment 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 300,
        blockedDates: [{ id: 3, startDate: '2021-01-05', endDate: '2021-01-06' }],
        rates: [{ bookingId: 3, placeId: '3', rate: 3 }],
    },
    {
        id: '4',
        name: 'Apartment 2',
        type: PlaceType.Apartment,
        description: 'Apartment 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 400,
        blockedDates: [{ id: 4, startDate: '2021-01-07', endDate: '2021-01-08' }],
        rates: [{ bookingId: 4, placeId: '4', rate: 2 }],
    },
    {
        id: '5',
        name: 'Hotel 1',
        type: PlaceType.Hotel,
        description: 'Hotel 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 500,
        blockedDates: [{ id: 5, startDate: '2021-01-09', endDate: '2021-01-10' }],
        rates: [{ bookingId: 5, placeId: '5', rate: 1 }],
    },
    {
        id: '6',
        name: 'Hotel 2',
        type: PlaceType.Hotel,
        description: 'Hotel 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 600,
        blockedDates: [{ id: 6, startDate: '2021-01-11', endDate: '2021-01-12' }],
        rates: [{ bookingId: 6, placeId: '6', rate: 5 }],
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
): Promise<Set<Date>> {
    let dates: Date[] = [];
    // get all bookings for this place
    const bookings = await getBookingsByPlaceLocalStorage(placeId);

    // get all bookis from user
    const userBookings = await getBookingsByUserIdLocalStorage(userId);

    const allBookings = bookings.concat(userBookings);
    // get all dates for this place and append
    allBookings.forEach((b) => {
        const range = getDatesFromRange(new Date(b.startDate), new Date(b.endDate));
        dates = dates.concat(range);
    });
    // get blocked dates from the place and append
    const blockedDates = getBlockedDatesByPlaceIdLocalStorage(placeId);
    blockedDates.forEach((b) => {
        const range = getDatesFromRange(new Date(b.startDate), new Date(b.endDate));
        dates = dates.concat(range);
    });

    // get all blocked dates for this place and append

    return new Set(dates.sort((a, b) => a.getTime() - b.getTime()));
}

export async function addBlockedDateLocalStorage({
    placeId,
    startDate,
    endDate,
}: {
    placeId: string;
    startDate: Date;
    endDate: Date;
}) {
    const place = getPlaceLocalStorage(placeId);
    if (place) {
        const newId = place.blockedDates.length + 1;
        const newBlockedDate: IBlockDate = {
            id: newId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };
        place.blockedDates.push(newBlockedDate);
        updatePlaceLocalStorage(place);
        return newId;
    }
}

export async function removedBlockedDateLocalStorage(placeId: string, blockedDateId: number) {
    const place = getPlaceLocalStorage(placeId);
    if (place) {
        const newBlockedDates = place.blockedDates.filter((b) => b.id !== blockedDateId);
        place.blockedDates = newBlockedDates;
        updatePlaceLocalStorage(place);
    }
}

export function getPlaceRateLocalStorage(placeId: string) {
    const place = getPlaceLocalStorage(placeId);
    if (place && place.rates) {
        const rates = place.rates;
        const total = rates.reduce((acc, rate) => acc + rate.rate, 0);
        const average = total / rates.length;
        return average;
    }
    return 0;
}

export function addNewPlaceRateLocalStorage(data: IRatePlace) {
    const { bookingId, placeId, rate } = data;
    const place = getPlaceLocalStorage(placeId);
    if (place) {
        const newRate: IRatePlace = {
            bookingId,
            placeId,
            rate,
        };
        place.rates.push(newRate);
        updatePlaceLocalStorage(place);
    }
}
