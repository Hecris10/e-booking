import { atom } from 'jotai';
import { IBookingView } from './booking-service';
import { IPlace } from './place-service';
import { UserView } from './user-service';

export const userAtom = atom<UserView | undefined>(undefined);
export const placesAtom = atom<IPlace[]>([]);
export const allBookingsAtom = atom<IBookingView[]>([]);
export const currentBookingsAtom = atom<IBookingView[]>([]);
export const canceledBookingsAtom = atom<IBookingView[]>([]);
export const selectedPlaceAtom = atom<IPlace | undefined>(undefined);

export interface IStates {
    user: UserView | undefined;
    places: IPlace[];
    allBookings: IBookingView[];
    currentBookings: IBookingView[];
    canceledBookings: IBookingView[];
}

export const setStatesAtom = atom(null, (get, set, props: IStates) => {
    const { user, places, allBookings, currentBookings, canceledBookings } = props;
    set(userAtom, user);
    set(placesAtom, places);
    set(allBookingsAtom, allBookings);
    set(currentBookingsAtom, currentBookings);
    set(canceledBookingsAtom, canceledBookings);
});

export const cleanStatesAtom = atom(null, (get, set) => {
    set(userAtom, undefined);
    set(placesAtom, []);
    set(allBookingsAtom, []);
    set(currentBookingsAtom, []);
    set(canceledBookingsAtom, []);
});

export const getStatesAtom = atom((get) => {
    const user = get(userAtom);
    const places = get(placesAtom);
    const allBookings = get(allBookingsAtom);
    const currentBookings = get(currentBookingsAtom);
    const canceledBookings = get(canceledBookingsAtom);
    return {
        user,
        places,
        allBookings,
        currentBookings,
        canceledBookings,
    };
});
