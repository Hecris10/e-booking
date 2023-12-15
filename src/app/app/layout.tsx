import EditBookingModal from '~/components/main-tabs/bookings/edit-booking-modal';
import NavBar from '~/components/nav-bar';
import AuthProvider from '~/components/providers/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="background-gradient h-screen w-screen">
            <NavBar />
            <EditBookingModal />
            <AuthProvider>{children}</AuthProvider>
        </main>
    );
}
