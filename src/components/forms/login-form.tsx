'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '~/components/error-message';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import TooltipComponent from '~/components/ui/tooltip';
import {
    BookingStatus,
    getBookingsByUserByStatusLocalStorage,
    getBookingsByUserIdLocalStorage,
} from '~/services/booking-service';
import { getPlacesLocalStorage } from '~/services/place-service';
import { IStates, setStatesAtom, userAtom } from '~/services/state-atoms';
import { loginLocalStorage } from '~/services/user-service';

export interface IUserLogin {
    emailOrPhone: string;
    password: string;
}

const LoginForm = ({ children }: { children: ReactElement }) => {
    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserLogin>();
    const setUser = useSetAtom(userAtom);
    const setGlobalStates = useSetAtom(setStatesAtom);
    const router = useRouter();
    const onSubmit = async (data: IUserLogin) => {
        const hasLogged = await loginLocalStorage(data.emailOrPhone, data.password);
        if (hasLogged.sucess) {
            const { user } = hasLogged;
            setUser(user);
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

            router.push('/app');
        } else {
            setError('emailOrPhone', {
                type: 'manual',
                message: 'Email or password incorrect',
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray rounded-xl w-full px-10 py-7 flex flex-col gap-5 max-w-[400px]">
            {errors.emailOrPhone?.type === 'manual' && (
                <ErrorMessage name={errors.emailOrPhone.message || ''} />
            )}
            <div className="form-element">
                <Input
                    {...register('emailOrPhone', {
                        required: true,
                    })}
                    required
                    type="email"
                    placeholder="Email or phone"
                    name="emailOrPhone"
                    title={'Email or phone'}
                />
                {errors.emailOrPhone?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    {...register('password', {
                        required: true,
                    })}
                    type="password"
                    required
                    placeholder="Password"
                    title="Password"
                />
                {errors.password?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <Button className="w-full mt-6" type="submit" size="default" predefinition="login">
                Login
            </Button>
            <TooltipComponent label="Forgor password?">{children}</TooltipComponent>
        </form>
    );
};

export default LoginForm;
