'use client';
import CreateBookNavigation from '../create-book/create-book-navigation';
import { AddIcon } from '../icons/generic-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CanceledBookings from './canceled-bookings';
import CurrentBookings from './current-bookings';
import HistoryBookings from './history-bookings';

export type AppTabs = 'current' | 'history' | 'canceled' | 'new';

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
    { tab: 'current', label: 'Current bookings', type: 'text' },
    { tab: 'history', label: 'History', type: 'text' },
    { tab: 'canceled', label: 'Canceled', type: 'text' },
    { tab: 'new', icon: <AddIcon />, type: 'icon' },
];

const AppCardNavigation = ({ tab }: { tab: AppTabs }) => {
    return (
        <section className="w-full bg-gray   rounded-md max-w-[800px]">
            <Tabs defaultValue={tab} className="w-full px-2 py-3">
                <TabsList className="w-full flex justify-between">
                    {tabs.map((t) => (
                        <TabsTrigger
                            className={
                                t.type === 'text' ? 'w-[150px] shadow-md' : 'p-1 rounded-full'
                            }
                            key={t.tab}
                            value={t.tab}>
                            {t.type === 'icon' ? (
                                t.icon
                            ) : (
                                <span className="text-sm">{t.label}</span>
                            )}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="h-[60vh] overflow-auto">
                    <TabsContent value="current">
                        <CurrentBookings />
                    </TabsContent>
                    <TabsContent value="history">
                        <HistoryBookings />
                    </TabsContent>
                    <TabsContent value="canceled">
                        <CanceledBookings />
                    </TabsContent>
                    <TabsContent value="new">
                        <CreateBookNavigation />
                    </TabsContent>
                </div>
            </Tabs>
        </section>
    );
};

export default AppCardNavigation;
