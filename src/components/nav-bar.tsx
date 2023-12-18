'use client';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GreatLogo from '~/../public/e-booking.png';
import { formatTextToTitleCase } from '~/lib/utils';
import { userAtom } from '~/state/state-atoms';
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
        <nav className="mx-auto my-2 flex justify-center relative">
            <Image
                alt="E-booking logo"
                className="w-[150px] h-[50px] md:w-[250px] my-auto md:h-[75px] mx-auto"
                src={GreatLogo}
            />

            <div className="absolute h-full flex align-middle right-0">
                <div className="my-auto">
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
            </div>
        </nav>
    );
};

export default NavBar;
