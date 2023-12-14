export interface IPlace {
    id: string;
    name: string;
    type: PlaceType;
    description: string;
    amenities: string[];
    pricePerNight: number;
    blockedDates: string[]; // Assuming date format is string for simplicity
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
        blockedDates: ['2021-01-01', '2021-01-02'],
    },
    {
        id: '2',
        name: 'House 2',
        type: PlaceType.House,
        description: 'House 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 200,
        blockedDates: ['2021-01-03', '2021-01-04'],
    },
    {
        id: '3',
        name: 'Apartment 1',
        type: PlaceType.Apartment,
        description: 'Apartment 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 300,
        blockedDates: ['2021-01-05', '2021-01-06'],
    },
    {
        id: '4',
        name: 'Apartment 2',
        type: PlaceType.Apartment,
        description: 'Apartment 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 400,
        blockedDates: ['2021-01-07', '2021-01-08'],
    },
    {
        id: '5',
        name: 'Hotel 1',
        type: PlaceType.Hotel,
        description: 'Hotel 1 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 500,
        blockedDates: ['2021-01-09', '2021-01-10'],
    },
    {
        id: '6',
        name: 'Hotel 2',
        type: PlaceType.Hotel,
        description: 'Hotel 2 description',
        amenities: ['wifi', 'kitchen'],
        pricePerNight: 600,
        blockedDates: ['2021-01-11', '2021-01-12'],
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
