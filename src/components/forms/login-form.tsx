'use client';

import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '~/components/error-message';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import TooltipComponent from '~/components/ui/tooltip';
import { authUserAction } from '~/services/server-actions/auth-user-actions';
import { loginLocalStorage } from '~/services/user-service';
import Spinner from '../spinner';

export interface IUserLogin {
    email: string;
    password: string;
}

const LoginForm = ({ children }: { children: ReactElement }) => {
    const {
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors, isValidating },
    } = useForm<IUserLogin>();

    const onSubmit = async (data: IUserLogin) => {
        const hasLogged = await loginLocalStorage(data.email, data.password);
        if (hasLogged.sucess) {
            const { user } = hasLogged;
            await authUserAction(user);
        } else {
            setError('email', {
                type: 'manual',
                message: 'Email or password incorrect',
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray rounded-xl w-full px-10 py-7 flex flex-col gap-5 max-w-[400px]">
            {errors.email?.type === 'manual' && <ErrorMessage name={errors.email.message || ''} />}
            <h2>Login into your account</h2>
            <div className="form-element">
                <Input
                    {...register('email', {
                        required: true,
                    })}
                    required
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    title={'Email'}
                />
                {errors.email?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>

            <div className="form-element">
                <Input
                    {...register('password', {
                        required: true,
                    })}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    title="Password"
                />
                {errors.password?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <Button
                className="w-full relative mt-6"
                type="submit"
                size="default"
                predefinition="login">
                Login{' '}
                {isValidating && (
                    <div className="absolute right-4">
                        {' '}
                        <Spinner />
                    </div>
                )}
            </Button>
            <TooltipComponent label="Forgor password?">{children}</TooltipComponent>
        </form>
    );
};

export default LoginForm;
