import { getPlacesLocalStorage } from './place-service';

export interface IBooking {
    id: string;
    userId: string;
    placeId: string;
    status: BookingStatus;
    startDate: string; // Assuming date format is string for simplicity
    endDate: string;
    totalPrice: number;
    pricePerNight: number;
}

export interface IBookingView extends IBooking {
    placeName: string;
    placeId: string;
    placeDescription: string;
    placeImages: string[];
}

export enum BookingStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Canceled = 'Canceled',
    Completed = 'Completed',
}

export const BookingStatusKeys = Object.keys(BookingStatus);
export const BookingStatusValues = Object.values(BookingStatus);

export function getBookingsLocalStorage(): IBooking[] {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
}

export function setBookingsLocalStorage(bookings: IBooking[]) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

export async function getBookinsByUserLocalStorage(
    userId: string,
    dateRange?: Date[]
): Promise<IBookingView[]> {
    const bookings = await getBookingsLocalStorage().filter((b) => b.userId === userId);
    const places = await getPlacesLocalStorage();
    return bookings.map((b) => {
        const place = places.find((p) => p.id === b.placeId);
        return {
            ...b,
            placeId: place?.id || '',
            placeName: place?.name || '',
            placeDescription: place?.description || '',
            placeAddress: '',
            placeImages: place?.images || [],
        };
    });
}

export interface IScheduleNewBooking {
    userId: string;
    placeId: string;
    startDate: Date;
    endDate: Date;
    pricePerNight: number;
    totalPrice: number;
}
export interface IScheduleUpdateBooking {
    id: string;
    startDate: Date;
    status: BookingStatus;
    endDate: Date;
    pricePerNight: number;
    totalPrice: number;
}
