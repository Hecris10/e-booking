import { useAtomValue } from 'jotai';
import React from 'react';
import { createBookingTabPosAtom } from '~/services/state-atoms';
import CreateBookScheduler from './create-book-scheduler';
import { SelectPlace } from './create-book-select-place';

export default function CreateBookFlow() {
    const selectedTab = useAtomValue(createBookingTabPosAtom);

    if (selectedTab === 'select') return <SelectPlace />;
    else return <CreateBookScheduler />;
}
