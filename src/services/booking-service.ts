interface IBooking {
    id: string;
    userId: string;
    placeId: string;
    status: string;
    startDate: string; // Assuming date format is string for simplicity
    endDate: string; // Assuming date format is string for simplicity
}

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

export function getBookingsByUserIdLocalStorage(userId: string, dateRange?: Date[]) {
    const bookings = getBookingsLocalStorage();
    return bookings.filter(
        (b) =>
            b.userId === userId &&
            (!dateRange ||
                (new Date(b.startDate) >= dateRange[0] && new Date(b.endDate) <= dateRange[1]))
    );
}
