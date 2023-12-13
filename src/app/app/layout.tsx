import NavBar from '~/components/nav-bar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="background-gradient h-screen w-screen">
            <NavBar /> {children}
        </main>
    );
}
