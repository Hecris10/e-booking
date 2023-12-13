'use client';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export type AppTabs = 'current' | 'history' | 'cancelled';
export interface AppTabListProps {
    tab: AppTabs;
    label: string;
}
const tabs: AppTabListProps[] = [
    { tab: 'current', label: 'Current bookings' },
    { tab: 'history', label: 'History' },
    { tab: 'cancelled', label: 'Cancelled' },
];

const AppCardNavigation = ({ tab }: { tab: AppTabs }) => {
    const onTabChange = (tab: AppTabs) => {
        redirect(`/app?tab=${tab}`);
    };

    // const redirectUrl = (tab: AppTabs) => {
    //     return `/app?tab=${tab}`;
    // };
    return (
        <section className="w-full bg-gray rounded-md max-w-[800px]">
            <Tabs defaultValue={tab} className="w-full px-10">
                <TabsList className="w-full flex justify-between">
                    {tabs.map((t) => (
                        <TabsTrigger key={t.tab} onClick={() => onTabChange(t.tab)} value={t.tab}>
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="current">Current</TabsContent>
                <TabsContent value="history">History</TabsContent>
                <TabsContent value="cancelled">Cancelled</TabsContent>
            </Tabs>
        </section>
    );
};

export default AppCardNavigation;
