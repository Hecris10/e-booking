import { atom } from 'jotai';
import { IBooking } from './booking-service';
import { IPlace } from './place-service';
import { IUser } from './user-service';

export const userAtom = atom<IUser | undefined>(undefined);
export const placesAtom = atom<IPlace[]>([]);
export const bookingsAtom = atom<IBooking[]>([]);
