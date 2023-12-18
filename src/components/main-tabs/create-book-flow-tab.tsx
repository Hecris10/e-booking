import { useAtomValue } from 'jotai';
import { createBookingTabPosAtom } from '~/state/state-atoms';
import CreateBookScheduler from '../bookings/create-booking/create-book-scheduler';
import { SelectPlace } from '../bookings/create-booking/create-book-select-place';

export default function CreateBookFlowTab() {
    const selectedTab = useAtomValue(createBookingTabPosAtom);

    if (selectedTab === 'select') return <SelectPlace />;
    else return <CreateBookScheduler />;
}
