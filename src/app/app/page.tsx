import AppCardNavigation, { AppTabs } from '~/components/app-card-navigation';
import { PageProps } from '../../../.next/types/app/layout';

function matchTab(tab: AppTabs): AppTabs {
    if (tab !== 'current' && tab !== 'history' && tab !== 'cancelled') {
        return 'current';
    }
    return tab;
}

export default function AppPage({ params, searchParams }: PageProps) {
    const tab = matchTab(searchParams.tab as AppTabs);

    return (
        <main className="px-6 flex flex-col items-center w-full h-screen gap-5">
            <AppCardNavigation tab={tab} />
        </main>
    );
}
