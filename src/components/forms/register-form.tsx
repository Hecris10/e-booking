'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { emailValidation } from '~/lib/utils';
import { addUserLocalStorage, userExistsLocalStorage } from '~/services/user-service';
import { ErrorMessage } from '../error-message';
import { Button } from '../ui/button';
import DatePicker from '../ui/date-picker';
import { Input } from '../ui/input';
import { SelectComponent, SelectItemType } from '../ui/select';
export interface IUserRegister {
    name: string;
    phone: string;
    email: string;
    birthDate: string;
    gender: string;
    country: string;
    state: string;
    password: string;
    confirmPassword: string;
}

export type IGender = 'M' | 'F' | 'O';

const genderOptions: SelectItemType[] = [
    {
        label: 'Masculine',
        value: 'M',
    },
    {
        label: 'Feminine',
        value: 'F',
    },
    {
        label: 'Other',
        value: 'O',
    },
];

const RegisterForm = (): ReactElement => {
    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        setValue,
        setError,
        formState: { errors, isLoading },
    } = useForm<IUserRegister>();
    const router = useRouter();
    const onSubmit = async (data: IUserRegister) => {
        const isUserRegistered = await userExistsLocalStorage(data.email);
        if (isUserRegistered) {
            setError('email', {
                type: 'manual',
                message: 'User already registered',
            });
            return;
        }

        addUserLocalStorage(data);
        router.push('/');
        clearErrors();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="form-element">
                <Input
                    {...register('name', {
                        required: true,
                    })}
                    placeholder="Nome"
                    required
                    className="input-standard"
                    type="text"
                    name="name"
                />
                {errors.name?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    placeholder="Phone"
                    {...register('phone', {
                        required: true,
                    })}
                    className="input-standard"
                    type="text"
                    name="phone"
                />
                {errors.phone?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    {...register('email', {
                        required: true,
                        // validate email regex
                        validate: (value) => emailValidation(value),
                    })}
                    placeholder="Email"
                    className="input-standard"
                    type="text"
                    name="email"
                />
                {errors.email?.type === 'required' && <ErrorMessage name="Required field" />}
                {errors.email?.type === 'manual' && (
                    <ErrorMessage name={errors.email.message || 'User already registered'} />
                )}
                {errors.email?.type === 'validate' && (
                    <ErrorMessage name="Email should be in name@email.com format" />
                )}
            </div>
            <div className="form-element">
                <DatePicker
                    {...register('birthDate', {
                        required: true,
                    })}
                    onChange={(date) => setValue('birthDate', date?.toISOString() || '')}
                />
                {errors.birthDate?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <SelectComponent
                    {...register('gender', {
                        required: true,
                    })}
                    placeholder="Gender"
                    options={genderOptions}
                    onChange={(gender) => setValue('gender', gender)}
                />
                {errors.gender?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    {...register('country', {
                        required: true,
                    })}
                    placeholder="Country"
                    className="input-standard"
                    type="text"
                    name="country"
                />
                {errors.country?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    {...register('state', {
                        required: true,
                    })}
                    placeholder="State/Prov/Depart"
                    className="input-standard"
                    type="text"
                    name="state"
                />
                {errors.state?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    {...register('password', {
                        required: true,
                    })}
                    placeholder="Password"
                    className="input-standard"
                    type="password"
                    name="password"
                />
                {errors.password?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <Input
                    {...register('confirmPassword', {
                        required: true,
                        validate: (value) => value === watch('password'),
                    })}
                    placeholder="Confirm Password"
                    className="input-standard"
                    type="password"
                    name="confirmPassword"
                />
                {errors.confirmPassword?.type === 'required' && (
                    <ErrorMessage name="Required field" />
                )}
                {errors.confirmPassword?.type === 'validate' && (
                    <ErrorMessage name="Passwords don't match!!!" />
                )}
            </div>
            <Button
                disabled={isLoading}
                className="w-full mt-5"
                type="submit"
                size="default"
                predefinition="login">
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
