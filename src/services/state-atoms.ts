import { atom } from 'jotai';
import { AppTabs } from '~/components/main-tabs/app-card-navigation';
import { getDatesFromRange } from '~/lib/utils';
import { BookingStatus, IBookingView, IScheduleNewBooking } from './booking-service';
import { IPlace, IRatePlace, initialPlaces } from './place-service';
import { UserView } from './user-service';

export type CreateBookingAtomProp = 'select' | 'schedule' | 'confirm';

export const userAtom = atom<UserView | undefined>(undefined);
export const placesAtom = atom<IPlace[]>(initialPlaces);
export const allBookingsAtom = atom<IBookingView[]>([]);
export const editBookingAtom = atom<{ booking: IBookingView; mode: 'edit' | 'delete' } | undefined>(
    undefined
);
export const selectedPlaceAtom = atom<IPlace | undefined>(undefined);
export const createBookingTabPosAtom = atom<CreateBookingAtomProp>('select');
export const mainTabAtom = atom<AppTabs>('current');
export const loadingAtom = atom(true);
export interface IStates {
    user: UserView | undefined;
    places: IPlace[];
    allBookings: IBookingView[];
    loading: boolean;
}

export const dispatchGlobalUserStatesAtom = atom(null, (get, set, props: IStates) => {
    const { user, places, allBookings, loading } = props;
    set(userAtom, user);
    set(placesAtom, places);
    set(allBookingsAtom, allBookings);
    set(loadingAtom, loading);
});

export const cleanStatesAtom = atom(null, (get, set) => {
    // const places = get(placesAtom);
    // const allBookings = get(allBookingsAtom);

    // setPlacesLocalStorage(places);
    // setBookingsLocalStorage(allBookings);
    set(userAtom, undefined);
    set(placesAtom, []);
    set(allBookingsAtom, []);
    set(editBookingAtom, undefined);
    set(selectedPlaceAtom, undefined);
    set(createBookingTabPosAtom, 'select');
});

export const getStatesAtom = atom((get) => {
    const user = get(userAtom);
    const places = get(placesAtom);
    const allBookings = get(allBookingsAtom);

    return {
        user,
        places,
        allBookings,
    };
});

export const dispatchPlaceAtom = atom(null, (get, set, place: IPlace) => {
    set(selectedPlaceAtom, place);
    set(createBookingTabPosAtom, 'schedule');
});

export const newBookAtom = atom(null, (get, set, newSchedule: IScheduleNewBooking) => {
    const bookings = get(allBookingsAtom);
    const place = get(placesAtom).find((p) => p.id === newSchedule.placeId);

    if (place) {
        const newBook: IBookingView = {
            ...newSchedule,
            id: bookings.length.toString(),
            status: BookingStatus.Pending,
            startDate: newSchedule.startDate.toISOString(),
            endDate: newSchedule.endDate.toISOString(),
            placeId: place.id,
            placeName: place.name,
            placeDescription: place.description,
            placeImages: place.images,
        };
        bookings.push(newBook);
    }
});

export const updateBookAtom = atom(null, (get, set, booking: IBookingView, placeRate?: number) => {
    const bookings = get(allBookingsAtom);
    const updatedBookings = bookings.map((b) => (b.id === booking.id ? booking : b));
    set(allBookingsAtom, updatedBookings);
    set(editBookingAtom, undefined);

    if (placeRate) {
        const places = get(placesAtom);
        const updatedPlaces = places.map((place) => {
            if (place.id === booking.placeId) {
                const newRate: IRatePlace = {
                    bookingId: +booking.id,
                    placeId: place.id,
                    rate: placeRate,
                };
                return {
                    ...place,
                    rates: [...place.rates, newRate],
                };
            }
            return place;
        });
        set(placesAtom, updatedPlaces);
    }
});

const getBookingsByUserId = (userId: string, bookings: IBookingView[]) => {
    return bookings.filter((b) => b.userId === userId);
};

export const getUnavailableDatesAtom = atom(null, (get, set, placeId: string) => {
    const dates = new Set<Date>();
    const userId = get(userAtom)?.id;
    const allBookings = get(allBookingsAtom);
    const userBookings = getBookingsByUserId(userId!.toString(), allBookings);
    const placeBookings = allBookings.filter((b) => b.placeId === placeId);

    const addDatesToSet = (range: Date[]) => {
        for (const date of range) {
            dates.add(date);
        }
    };

    const processBookings = (bookings1: IBookingView[], bookings2: IBookingView[]) => {
        bookings1.forEach((b, index) => {
            const range1 = getDatesFromRange(new Date(b.startDate), new Date(b.endDate));
            const range2 = getDatesFromRange(
                new Date(bookings2[index].startDate),
                new Date(bookings2[index].endDate)
            );
            addDatesToSet(range1);
            addDatesToSet(range2);
        });
        return bookings1.length;
    };

    const lastIndex = Math.min(
        processBookings(userBookings, placeBookings),
        processBookings(placeBookings, userBookings)
    );

    // get the remaining bookings
    const remainingBookings =
        userBookings.length > placeBookings.length
            ? userBookings.slice(lastIndex + 1)
            : placeBookings.slice(lastIndex + 1);

    remainingBookings.forEach((b) => {
        const range = getDatesFromRange(new Date(b.startDate), new Date(b.endDate));
        addDatesToSet(range);
    });

    return dates;
});
