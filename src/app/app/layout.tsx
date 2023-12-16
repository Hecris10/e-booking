import { ModalProvider } from '~/components/bookings/modal-provider';
import NavBar from '~/components/nav-bar';
import AuthProvider from '~/components/providers/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto max-w-[1200px] ">
            <NavBar />
            <AuthProvider>
                <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
        </main>
    );
}
