import { useAtomValue } from 'jotai';
import { createBookingTabPosAtom } from '~/services/state-atoms';
import { getCreateBookStep } from './create-book-utils';

export default function CreateBookNavigation() {
    const selectedTab = useAtomValue(createBookingTabPosAtom);
    return <>{getCreateBookStep(selectedTab)!}</>;
}
