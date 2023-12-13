export interface IBooking {
    id: string;
    userId: string;
    placeId: string;
    status: BookingStatus;
    startDate: string; // Assuming date format is string for simplicity
    endDate: string; // Assuming date format is string for simplicity
}

export enum BookingStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Canceled = 'Canceled',
    Completed = 'Completed',
    Archived = 'Archived',
}

export const bookings: IBooking[] = [
    {
        id: '1',
        userId: '1',
        placeId: '1',
        status: BookingStatus.Confirmed,
        startDate: '2021-01-01',
        endDate: '2021-01-03',
    },
    {
        id: '2',
        userId: '1',
        placeId: '2',
        status: BookingStatus.Pending,
        startDate: '2021-01-04',
        endDate: '2021-01-06',
    },
    {
        id: '3',
        userId: '1',
        placeId: '3',
        status: BookingStatus.Completed,
        startDate: '2021-01-07',
        endDate: '2021-01-09',
    },
    {
        id: '4',
        userId: '1',
        placeId: '4',
        status: BookingStatus.Canceled,
        startDate: '2021-01-10',
        endDate: '2021-01-12',
    },
    {
        id: '5',
        userId: '1',
        placeId: '5',
        status: BookingStatus.Archived,
        startDate: '2021-01-13',
        endDate: '2021-01-15',
    },
];

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

export async function getBookingsByUserByStatusLocalStorage(userId: number, status: BookingStatus) {
    const bookings = await getBookingsLocalStorage();
    return bookings.filter((b) => b.userId === userId.toString() && b.status === status);
}
