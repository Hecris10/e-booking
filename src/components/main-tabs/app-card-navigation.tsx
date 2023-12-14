'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CanceledBookings from './canceled-bookings';
import CurrentBookings from './current-bookings';
import HistoryBookings from './history-bookings';

export type AppTabs = 'current' | 'history' | 'canceled';
export interface AppTabListProps {
    tab: AppTabs;
    label: string;
}
const tabs: AppTabListProps[] = [
    { tab: 'current', label: 'Current bookings' },
    { tab: 'history', label: 'History' },
    { tab: 'canceled', label: 'Canceled' },
];

const AppCardNavigation = ({ tab }: { tab: AppTabs }) => {
    // const redirectUrl = (tab: AppTabs) => {
    //     return `/app?tab=${tab}`;
    // };

    // const cleanGlobalStates = useSetAtom(cleanStatesAtom);

    // useEffect(() => {
    //     return () => {
    //         cleanGlobalStates();
    //     };
    // }, [cleanGlobalStates]);

    return (
        <section className="w-full bg-gray min-h-[40vh] rounded-md max-w-[800px]">
            <Tabs defaultValue={tab} className="w-full px-2">
                <TabsList className="w-full flex justify-between">
                    {tabs.map((t) => (
                        <TabsTrigger className="w-[150px]" key={t.tab} value={t.tab}>
                            {t.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="current">
                    <CurrentBookings />
                </TabsContent>
                <TabsContent value="history">
                    <HistoryBookings />
                </TabsContent>
                <TabsContent value="canceled">
                    <CanceledBookings />
                </TabsContent>
            </Tabs>
        </section>
    );
};

export default AppCardNavigation;
