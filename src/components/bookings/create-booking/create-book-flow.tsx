import { useAtomValue } from 'jotai';
import { createBookingTabPosAtom } from '~/state/state-atoms';
import CreateBookScheduler from './create-book-scheduler';
import { SelectPlace } from './create-book-select-place';

export default function CreateBookFlow() {
    const selectedTab = useAtomValue(createBookingTabPosAtom);

    if (selectedTab === 'select') return <SelectPlace />;
    else return <CreateBookScheduler />;
}
