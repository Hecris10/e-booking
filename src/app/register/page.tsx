import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GreatLogo from '~/../public/e-booking.png';
import RegisterForm from '~/components/forms/register-form';
import { cn } from '~/lib/utils';

export const metadata: Metadata = {
    title: 'E-booking | Register',
    description: 'Register into E-booking account',
};

export default function Register() {
    return (
        <div className="px-6 flex flex-col pt-[5vh] items-center w-full h-full gap-5">
            <Image alt="E-booking logo" src={GreatLogo} />
            <div className="w-full flex flex-col gap-3 max-w-[400px]">
                <RegisterForm />
                <div className="px-10 mt-5 flex w-full">
                    <Link
                        title="Login"
                        className={cn(
                            'hover:underline text-white',
                            'text-md rounded-xl w-full text-center p-1 font-extrabold text-[20px]'
                        )}
                        href={'/'}>
                        Return to login
                    </Link>
                </div>
            </div>
        </div>
    );
}
