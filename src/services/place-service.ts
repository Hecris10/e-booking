export interface IPlace {
    id: string;
    name: string;
    type: string;
    description: string;
    amenities: string[];
    pricePerNight: number;
    blockedDates: string[]; // Assuming date format is string for simplicity
}

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
