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
    placeAddress: string;
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

export function addBookingLocalStorage(booking: IBooking) {
    const bookings = getBookingsLocalStorage();
    bookings.push(booking);
    setBookingsLocalStorage(bookings);
}

export function updateBookingLocalStorage(booking: IBooking) {
    const bookings = getBookingsLocalStorage();
    const index = bookings.findIndex((b) => b.id === booking.id);
    bookings[index] = booking;
    setBookingsLocalStorage(bookings);
}

export function deleteBookingLocalStorage(bookingId: string) {
    const bookings = getBookingsLocalStorage();
    const index = bookings.findIndex((b) => b.id === bookingId);
    bookings.splice(index, 1);
    setBookingsLocalStorage(bookings);
}

export function getBookingLocalStorage(bookingId: string) {
    const bookings = getBookingsLocalStorage();
    return bookings.find((b) => b.id === bookingId);
}

export async function getBookingsByUserIdLocalStorage(userId: number, dateRange?: Date[]) {
    const bookings = await getBookingsLocalStorage();
    return bookings.filter(
        (b) =>
            b.userId === userId.toString() &&
            (!dateRange ||
                (new Date(b.startDate) >= dateRange[0] && new Date(b.endDate) <= dateRange[1]))
    );
}

export async function getBookingsByUserByStatusLocalStorage(
    userId: number,
    status: BookingStatus[]
) {
    const bookings = await getBookingsLocalStorage();
    return bookings.filter((b) => b.userId === userId.toString() && status.includes(b.status));
}

export async function getBookinsByUserLocalStorage(
    userId: number,
    dateRange?: Date[]
): Promise<IBookingView[]> {
    const bookings = await getBookingsByUserIdLocalStorage(userId, dateRange);
    const places = await getPlacesLocalStorage();
    return bookings.map((b) => {
        const place = places.find((p) => p.id === b.placeId);
        return {
            ...b,
            placeId: place?.id || '',
            placeName: place?.name || '',
            placeDescription: place?.description || '',
            placeAddress: '',
        };
    });
}

export async function getBookinsByUserWithPlaceByStatusLocalStorage(
    userId: number,
    status: BookingStatus[],
    dateRange?: Date[]
): Promise<IBookingView[]> {
    const bookings = await getBookingsByUserByStatusLocalStorage(userId, status);
    const places = await getPlacesLocalStorage();
    return bookings.map((b) => {
        const place = places.find((p) => p.id === b.placeId);
        return {
            ...b,
            placeId: place?.id || '',
            placeName: place?.name || '',
            placeDescription: place?.description || '',
            placeAddress: '',
        };
    });
}

export async function updateBookingDatesLocalStorage(
    bookingId: string,
    startDate: string,
    endDate: string
) {
    const booking = await getBookingLocalStorage(bookingId);
    if (booking) {
        booking.startDate = startDate;
        booking.endDate = endDate;
        await updateBookingLocalStorage(booking);
    }
}

export async function getBookingsByPlaceLocalStorage(placeId: string) {
    const bookings = await getBookingsLocalStorage();
    return bookings.filter((b) => b.placeId === placeId);
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

export async function scheduleBookingLocalStorage(data: IScheduleNewBooking): Promise<IBooking> {
    const lastBookingId = await getBookingsLocalStorage().length;
    const booking: IBooking = {
        id: (lastBookingId + 1).toString(),
        userId: data.userId,
        placeId: data.placeId,
        status: BookingStatus.Pending,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        pricePerNight: data.pricePerNight,
        totalPrice: data.totalPrice,
    };
    addBookingLocalStorage(booking);
    return booking;
}

export async function updateScheduleBookingLocalStorage(data: IScheduleUpdateBooking) {
    const booking = await getBookingLocalStorage(data.id);
    if (booking) {
        booking.startDate = data.startDate.toISOString();
        booking.endDate = data.endDate.toISOString();
        booking.pricePerNight = data.pricePerNight;
        booking.totalPrice = data.totalPrice;
        booking.status = data.status;
        await updateBookingLocalStorage(booking);
    }
}

export async function cancelScheduleBookingLocalStorage(bookingId: string) {
    console.log('cancelScheduleBookingLocalStorage', bookingId);
    const booking = await getBookingLocalStorage(bookingId);
    if (booking) {
        booking.status = BookingStatus.Canceled;
        await updateBookingLocalStorage(booking);
    }
}
