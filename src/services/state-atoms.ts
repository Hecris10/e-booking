import { atom } from 'jotai';
import { IBooking } from './booking-service';
import { IPlace } from './place-service';
import { UserView } from './user-service';

export const userAtom = atom<UserView | undefined>(undefined);
export const placesAtom = atom<IPlace[]>([]);
export const allBookingsAtom = atom<IBooking[]>([]);
export const currentBookingsAtom = atom<IBooking[]>([]);
export const canceledBookingsAtom = atom<IBooking[]>([]);

export interface IStates {
    user: UserView | undefined;
    places: IPlace[];
    allBookings: IBooking[];
    currentBookings: IBooking[];
    canceledBookings: IBooking[];
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
