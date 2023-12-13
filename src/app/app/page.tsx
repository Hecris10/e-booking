import { redirect } from 'next/navigation';
import AppCardNavigation, { AppTabs } from '~/components/main-tabs/app-card-navigation';
import { PageProps } from '~/lib/global-types';
import { isUserAuthAction } from '~/services/server-actions/auth-user-actions';

function matchTab(tab: AppTabs): AppTabs {
    if (tab !== 'current' && tab !== 'history' && tab !== 'cancelled') {
        return 'current';
    }
    return tab;
}

export default async function AppPage({ params, searchParams }: PageProps) {
    const tab = matchTab(searchParams.tab as AppTabs);
    const isAuth = await isUserAuthAction();
    if (!isAuth.sucess) redirect('/');
    return (
        <main className="px-6 flex flex-col items-center w-full h-screen gap-5">
            <AppCardNavigation tab={tab} />
        </main>
    );
}
