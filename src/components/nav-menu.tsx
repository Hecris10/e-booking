'use client';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { logOut } from '~/services/server-actions/auth-user-actions';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';

const NavMenu = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger asChild>{children}</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem
                        onClick={async () => await logOut(pathname)}
                        className="w-full justify-between px-1 cursor-pointer">
                        <p>Log out</p> <LogOut />
                    </MenubarItem>
                    {/* <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem> */}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default NavMenu;
