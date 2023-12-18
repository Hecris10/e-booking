'use client';
import { useAtom } from 'jotai';
import { AppTabs, mainTabAtom } from '~/state/state-atoms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CanceledBookings from './canceled-bookings';
import CreateBookFlowTab from './create-book-flow-tab';
import CurrentBookings from './current-bookings';
import HistoryBookings from './history-bookings';

type IconTab = {
    type: 'icon';
    icon: JSX.Element;
    tab: AppTabs;
};

type TextTab = {
    type: 'text';
    label: string;
    tab: AppTabs;
};

export type AppTabListProps = IconTab | TextTab;

const a: AppTabListProps = {
    tab: 'current',
    type: 'text',
    label: 'Current bookings',
};

const tabs: AppTabListProps[] = [
    { tab: 'new', label: 'Stays', type: 'text' },
    { tab: 'current', label: 'My bookings', type: 'text' },
    { tab: 'history', label: 'History', type: 'text' },
    { tab: 'canceled', label: 'Canceled', type: 'text' },
];

const MainTabNavigation = () => {
    const [tab, setTab] = useAtom(mainTabAtom);
    return (
        <>
            <div className="w-full bg-gray py-2 px-2 rounded-md max-w-[1200px]">
                <Tabs
                    value={tab}
                    onValueChange={(e) => setTab(e as AppTabs)}
                    className="w-full px-2 py-3">
                    <TabsList className="w-full grid grid-cols-2 gap-3 md:flex md:justify-between">
                        {tabs.map((t) => (
                            <TabsTrigger
                                className={
                                    t.type === 'text'
                                        ? 'md:w-[150px] shadow-md'
                                        : 'h-10 w-10 p-1 rounded-full'
                                }
                                key={t.tab}
                                id={t.tab}
                                value={t.tab}>
                                {t.type === 'icon' ? (
                                    t.icon
                                ) : (
                                    <span className="text-sm">{t.label}</span>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="max-h-[80vh] min-h-[60vh] mt-14 mb-2 md:mt-2">
                        <TabsContent value="new">
                            <CreateBookFlowTab />
                        </TabsContent>
                        <TabsContent value="current">
                            <CurrentBookings />
                        </TabsContent>
                        <TabsContent value="history">
                            <HistoryBookings />
                        </TabsContent>
                        <TabsContent value="canceled">
                            <CanceledBookings />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </>
    );
};

export default MainTabNavigation;
