'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    BookingStatus,
    getBookinsByUserLocalStorage,
    getBookinsByUserWithPlaceByStatusLocalStorage,
} from '~/services/booking-service';
import { getPlacesLocalStorage } from '~/services/place-service';
import { isUserAuthAction } from '~/services/server-actions/auth-user-actions';
import { IStates, cleanStatesAtom, setStatesAtom } from '~/services/state-atoms';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    // const [isAuthenticated, setIsAuthenticaed] = useState(false);
    const router = useRouter();
    const setGlobalStates = useSetAtom(setStatesAtom);
    const cleanGlobalStates = useSetAtom(cleanStatesAtom);

    useEffect(() => {
        const auth = async () => {
            const isAuth = await isUserAuthAction();
            if (!isAuth.sucess) {
                router.push('/');
            } else {
                const { user } = isAuth;
                const allBookings = await getBookinsByUserLocalStorage(user.id);
                const currentBookings = await getBookinsByUserWithPlaceByStatusLocalStorage(
                    user.id,
                    BookingStatus.Confirmed
                );
                const canceledBookings = await getBookinsByUserWithPlaceByStatusLocalStorage(
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
                // setIsAuthenticaed(true);
            }
        };
        auth();
        return () => {
            cleanGlobalStates();
        };
    }, [router, setGlobalStates, cleanGlobalStates]);

    return <>{children}</>;
}
