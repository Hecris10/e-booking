'use client';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { formatTextToTitleCase } from '~/lib/utils';
import { userAtom } from '~/services/state-atoms';
import NavMenu from './nav-menu';
import { UserAvatar } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

const NavBar = () => {
    const user = useAtomValue(userAtom);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [isLoading, user]);

    const userInitials =
        user?.name
            .split(' ')
            .map((n) => n[0])
            .join('') || '';

    return (
        <nav className="mx-auto mb-2 flex justify-end">
            <div>
                {isLoading || !user ? (
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            {/* <Skeleton className="h-4 w-[250px]" /> */}
                            <Skeleton className="h-4 w-[200px] hidden md:flex" />
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2 hover:bg-graytransparent rounded-md cursor-pointer">
                        <NavMenu>
                            <div className="flex gap-2 hover:bg-graytransparent rounded-md cursor-pointer">
                                <UserAvatar
                                    src={''}
                                    userName={`${userInitials[0]}${
                                        userInitials[userInitials.length - 1]
                                    }`}
                                />
                                <div className="items-center space-x-4 hidden md:flex">
                                    <p className="text-white text-center">
                                        {formatTextToTitleCase(user.name)}
                                    </p>
                                </div>
                            </div>
                        </NavMenu>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
