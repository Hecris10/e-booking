'use client';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { formatTextToTitleCase } from '~/lib/utils';
import { UserAtom } from '~/services/state-atoms';
import { UserAvatar } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

const NavBar = () => {
    const user = useAtomValue(UserAtom);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [isLoading, user]);

    console.log('user', isLoading);

    const userInitials =
        user?.name
            .split(' ')
            .map((n) => n[0])
            .join('') || '';

    return (
        <nav className="w-screen flex justify-end">
            <div className="w-full max-w-[400px] p-3">
                {isLoading || !user ? (
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-[250px]" /> */}
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <UserAvatar
                            src={''}
                            userName={`${userInitials[0]}${userInitials[userInitials.length - 1]}`}
                        />
                        <div className="flex items-center space-x-4">
                            <p className="text-white text-center">
                                {formatTextToTitleCase(user.name)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
