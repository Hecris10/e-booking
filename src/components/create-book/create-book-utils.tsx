import { CreateBookingAtomProp } from '~/services/state-atoms';
import { SelectPlace } from './create-book-select-place';

interface CreateBookStepProps {
    value: CreateBookingAtomProp;
    element: React.ReactNode;
}

const CreateBookSteps: CreateBookStepProps[] = [
    {
        value: 'select' as CreateBookingAtomProp,
        element: <SelectPlace />,
    },
    {
        value: 'schedule',
        element: <div>Step 2</div>,
    },
];

export function getCreateBookStep(value: CreateBookingAtomProp): React.ReactNode {
    switch (value) {
        case 'select':
            return CreateBookSteps[0].element;
        case 'schedule':
            <></>;
        default:
            return <></>;
    }
}
