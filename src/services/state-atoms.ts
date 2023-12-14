import { atom } from 'jotai';
import { IBookingView, getBookinsByUserLocalStorage } from './booking-service';
import { IPlace } from './place-service';
import { UserView } from './user-service';

export type CreateBookingAtomProp = 'select' | 'schedule' | 'confirm';

export const userAtom = atom<UserView | undefined>(undefined);
export const placesAtom = atom<IPlace[]>([]);
export const allBookingsAtom = atom<IBookingView[]>([]);

export const selectedPlaceAtom = atom<IPlace | undefined>(undefined);
export const createBookingTabPosAtom = atom<CreateBookingAtomProp>('select');
export interface IStates {
    user: UserView | undefined;
    places: IPlace[];
    allBookings: IBookingView[];
}

export const dispatchGlobalUserStatesAtom = atom(null, (get, set, props: IStates) => {
    const { user, places, allBookings } = props;
    set(userAtom, user);
    set(placesAtom, places);
    set(allBookingsAtom, allBookings);
});

export const cleanStatesAtom = atom(null, (get, set) => {
    set(userAtom, undefined);
    set(placesAtom, []);
    set(allBookingsAtom, []);
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

export const updateBookingsAtom = atom(null, async (get, set) => {
    console.log('updateBookingsAtom');
    const userId = get(userAtom)?.id;
    if (userId) {
        const bookings = await getBookinsByUserLocalStorage(userId);
        set(allBookingsAtom, bookings);
    }
});
