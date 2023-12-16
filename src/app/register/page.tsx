import { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '~/components/forms/register-form';
import { cn } from '~/lib/utils';

export const metadata: Metadata = {
    title: 'E-booking | Register',
    description: 'Register into E-booking account',
};

export default function Register() {
    return (
        <main className="px-6 flex flex-col  items-center w-full h-screen gap-5">
            <h1 className="text-white text-center mt-5 leading-normal text-[20px] font-[700]">
                Registration
            </h1>

            <div className="w-full flex flex-col gap-3 max-w-[400px]">
                <RegisterForm />
                <div className="px-10 mt-5 flex w-full">
                    <Link
                        title="Login"
                        className={cn(
                            'hover:scale-105 active:scale-90',
                            'bg-yellow text-lightblue text-md rounded-xl w-full text-center p-1 font-extrabold text-[20px]'
                        )}
                        href={'/login'}>
                        Voltar para login
                    </Link>
                </div>
            </div>
        </main>
    );
}
