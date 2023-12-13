'use client';

import { useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    BookingStatus,
    getBookingsByUserByStatusLocalStorage,
    getBookingsByUserIdLocalStorage,
} from '~/services/booking-service';
import { getPlacesLocalStorage } from '~/services/place-service';
import { isUserAuthAction } from '~/services/server-actions/auth-user-actions';
import { IStates, setStatesAtom } from '~/services/state-atoms';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const setGlobalStates = useSetAtom(setStatesAtom);

    useEffect(() => {
        const auth = async () => {
            const isAuth = await isUserAuthAction();
            if (!isAuth.sucess) {
                router.push('/');
            } else {
                const { user } = isAuth;
                const allBookings = await getBookingsByUserIdLocalStorage(user.id);
                const currentBookings = await getBookingsByUserByStatusLocalStorage(
                    user.id,
                    BookingStatus.Confirmed
                );
                const canceledBookings = await getBookingsByUserByStatusLocalStorage(
                    user.id,
                    BookingStatus.Canceled
                );
                const places = await getPlacesLocalStorage();
                const globalStates: IStates = {
                    user,
                    allBookings,
                    currentBookings,
                    canceledBookings,
                    places,
                };
                setGlobalStates(globalStates);
                setIsInitialized(true);
            }
        };
        auth();
    }, [pathName, router, setGlobalStates]);

    return <>{children}</>;
}
