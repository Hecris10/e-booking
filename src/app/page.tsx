import Link from 'next/link';
import { Metadata } from 'next/types';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import TooltipComponent from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';

export const metadata: Metadata = {
    title: 'E-booking | Login',
    description: 'Login into your E-booking account',
};

export default function Login() {
    return (
        <main className="background-gradient px-6 flex flex-col  items-center w-full h-full gap-5">
            <h1 className="text-white text-center mt-5 leading-normal text-[20px] font-[700]">
                LOGIN
            </h1>

            <form className="bg-gray rounded-xl w-full px-10 py-7 flex flex-col gap-5 max-w-[400px]">
                <Input placeholder="Email or phone" title={'Email or phone'} value={''} />
                <Input type="password" placeholder="Password" title="Password" value="" />
                <Button className="w-full" type="submit" size="default" predefinition="login">
                    Login
                </Button>
                <TooltipComponent label="Forgor password?">
                    <Link href="/recover">
                        <p className="text-darkgray underline text-center">Forgot password?</p>
                    </Link>
                </TooltipComponent>
            </form>
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
        </main>
    );
}
