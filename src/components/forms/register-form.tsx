'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { emailValidation } from '~/lib/utils';
import { addUserLocalStorage, userExistsLocalStorage } from '~/services/user-service';
import { ErrorMessage } from '../error-message';
import Spinner from '../spinner';
import { Button } from '../ui/button';
import DatePicker from '../ui/date-picker';
import { Input } from '../ui/input';
import { SelectComponent, SelectItemType } from '../ui/select';
import { toast } from '../ui/use-toast';
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
        formState: { errors, isValidating },
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

        await addUserLocalStorage(data);
        toast({ description: 'User registered successfully' });
        router.push('/');
        clearErrors();
    };

    return (
        <form
            className="bg-gray rounded-xl w-full px-10 py-7 flex flex-col gap-5 max-w-[400px]"
            onSubmit={handleSubmit(onSubmit)}>
            <h2>Register your account</h2>
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
                    id="birth-date"
                    placeHolder="Birth date"
                    onChange={(date) => setValue('birthDate', date?.toISOString() || '')}
                />
                {errors.birthDate?.type === 'required' && <ErrorMessage name="Required field" />}
            </div>
            <div className="form-element">
                <SelectComponent
                    {...register('gender', {
                        required: true,
                    })}
                    name="gender"
                    id="gender"
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
                className="w-full relative mt-6"
                type="submit"
                size="default"
                predefinition="login">
                Register{' '}
                {isValidating && (
                    <div className="absolute right-4">
                        {' '}
                        <Spinner />
                    </div>
                )}
            </Button>
        </form>
    );
};

export default RegisterForm;
