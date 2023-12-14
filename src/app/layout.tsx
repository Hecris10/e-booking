import { Inter } from 'next/font/google';
import JotaiProvider from '~/components/providers/jotai-provider';
import { Toaster } from '~/components/ui/toaster';
import { cn } from '~/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(inter.className, 'w-full h-screen')}>
                <JotaiProvider>
                    {children} <Toaster />
                </JotaiProvider>
            </body>
        </html>
    );
}
