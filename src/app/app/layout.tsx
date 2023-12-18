import { Metadata } from 'next/types';
import { ModalProvider } from '~/components/bookings/modal-provider';
import NavBar from '~/components/nav-bar';
import AuthProvider from '~/components/providers/auth-provider';

export const metadata: Metadata = {
    title: 'E-booking | Book your next vacation with E-booking',
    description: 'Book your next vacation with E-booking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto px-2 max-w-[1200px]">
            <NavBar />
            <AuthProvider>
                <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
        </main>
    );
}
