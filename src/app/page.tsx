import Link from 'next/link';
import { Metadata } from 'next/types';
import LoginForm from '~/components/forms/login-form';
import { cn } from '~/lib/utils';

export const metadata: Metadata = {
    title: 'E-booking | Login',
    description: 'Login into your E-booking account',
};

export default function Login() {
    return (
        <div className="background-gradient px-6 flex flex-col  items-center w-full h-full gap-5">
            <h1 className="text-white text-center mt-5 leading-normal text-[20px] font-[700]">
                LOGIN
            </h1>
            <LoginForm>
                <Link href="/recover">
                    <p className="text-darkgray underline text-center">Forgot password?</p>
                </Link>
            </LoginForm>

            <div className="flex w-full flex-col max-w-[400px] mt-10 px-10 gap-5">
                <p className="text-white text-center">Not registered yet?</p>
                <Link
                    title="Register"
                    className={cn(
                        'hover:scale-105 active:scale-90',
                        'bg-yellow text-lightblue  text-md rounded-xl  w-full text-center p-1 font-extrabold text-[20px]'
                    )}
                    href={'/register'}>
                    Register
                </Link>
            </div>
        </div>
    );
}
