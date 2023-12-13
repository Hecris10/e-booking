'use client';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { cleanStatesAtom, getStatesAtom } from '~/services/state-atoms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CurrentBookings from './current-bookings';

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
    // const redirectUrl = (tab: AppTabs) => {
    //     return `/app?tab=${tab}`;
    // };
    const globalStates = useAtomValue(getStatesAtom);
    const cleanGlobalStates = useSetAtom(cleanStatesAtom);

    useEffect(() => {
        return () => {
            cleanGlobalStates();
        };
    }, [globalStates, cleanGlobalStates]);

    return (
        <section className="w-full bg-gray rounded-md max-w-[800px]">
            <Tabs defaultValue={tab} className="w-full px-10">
                <TabsList className="w-full flex justify-between">
                    {tabs.map((t) => (
                        <TabsTrigger key={t.tab} value={t.tab}>
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="current">
                    <CurrentBookings />
                </TabsContent>
                <TabsContent value="history">History</TabsContent>
                <TabsContent value="cancelled">Cancelled</TabsContent>
            </Tabs>
        </section>
    );
};

export default AppCardNavigation;
