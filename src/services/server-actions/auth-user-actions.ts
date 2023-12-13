'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginReturnType, UserView } from '../user-service';

export async function authUserAction(user: UserView) {
    const cookieStore = cookies();
    const userStr = JSON.stringify(user);
    console.log('userStr', JSON.parse(userStr));
    cookieStore.set('e-booking-token', userStr, {
        path: '/',
        maxAge: 3600,
        sameSite: 'strict',
        secure: true,
    });
    redirect('/app');
}

export async function isUserAuthAction(): Promise<LoginReturnType> {
    const cookieStore = cookies();
    const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || '';
    const userStr = cookieStore.get('e-booking-token')?.value;

    if (!userStr) {
        return {
            sucess: false,
        };
    }
    const user = JSON.parse(userStr) as UserView;
    return {
        sucess: true,
        user,
    };
}
