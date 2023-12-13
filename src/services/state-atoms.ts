import { atom } from 'jotai';
import { IUser } from './user-service';

export const UserAtom = atom<IUser | undefined>(undefined);
