import NavBar from '~/components/nav-bar';
import AuthProvider from '~/components/providers/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="background-gradient h-screen w-screen">
            <NavBar /> <AuthProvider>{children}</AuthProvider>
        </main>
    );
}
