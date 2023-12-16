import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';
import GreatLogo from '~/../public/e-booking.png';
import LoginForm from '~/components/forms/login-form';
import { cn } from '~/lib/utils';
import { isUserAuthAction } from '~/services/server-actions/auth-user-actions';

export const metadata: Metadata = {
    title: 'E-booking | Login',
    description: 'Login into your E-booking account',
};

export default async function Login() {
    const isAuth = await isUserAuthAction();
    if (isAuth.sucess) redirect('/app');
    return (
        <div className="px-6 flex flex-col mt-[5vh] md:mt-[10vh] items-center w-full h-full gap-5">
            <Image alt="E-booking logo" width={400} src={GreatLogo} />
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
