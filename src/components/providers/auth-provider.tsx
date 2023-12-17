'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getBookinsByUserLocalStorage } from '~/services/booking-service';

import { getPlacesLocalStorage, initialPlaces } from '~/services/place-service';
import { isUserAuthAction } from '~/services/server-actions/auth-user-actions';
import { IStates, cleanStatesAtom, dispatchGlobalUserStatesAtom } from '~/services/state-atoms';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    // const [isAuthenticated, setIsAuthenticaed] = useState(false);
    const router = useRouter();

    const setGlobalStates = useSetAtom(dispatchGlobalUserStatesAtom);
    const cleanGlobalStates = useSetAtom(cleanStatesAtom);

    useEffect(() => {
        const auth = async () => {
            const isAuth = await isUserAuthAction();
            if (!isAuth.sucess) {
                return router.push('/');
            }
            const { user } = isAuth;
            const placesLocalStorage = localStorage.getItem('places');
            if (!placesLocalStorage || placesLocalStorage.length === 0) {
                localStorage.setItem('places', JSON.stringify(initialPlaces));
            }
            const allBookings = await getBookinsByUserLocalStorage(user.id.toString());

            const places = await getPlacesLocalStorage();
            const globalStates: IStates = {
                user,
                allBookings,
                places,
                loading: false,
            };
            setTimeout(() => {
                setGlobalStates(globalStates);
            }, 2000);
        };
        auth();

        return () => {
            cleanGlobalStates();
        };
    }, [router, setGlobalStates, cleanGlobalStates]);

    return <>{children}</>;
}
