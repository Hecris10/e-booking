import { redirect } from 'next/navigation';
import MainTabNavigation from '~/components/main-tabs/main-tab-navigation';
import { PageProps } from '~/lib/global-types';
import { isUserAuthAction } from '~/services/server-actions/auth-user-actions';
import { AppTabs } from '~/state/state-atoms';

function matchTab(tab: AppTabs): AppTabs {
    if (tab !== 'current' && tab !== 'history' && tab !== 'canceled') {
        return 'current';
    }
    return tab;
}

export default async function AppPage({ params, searchParams }: PageProps) {
    const tab = matchTab(searchParams.tab as AppTabs);
    const isAuth = await isUserAuthAction();
    if (!isAuth.sucess) redirect('/');
    return (
        <div className="flex flex-col items-center w-full h-screen gap-5">
            <MainTabNavigation />
        </div>
    );
}
