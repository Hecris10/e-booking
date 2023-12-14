import { SelectPlace } from './create-book-select-place';

interface CreateBookStepProps {
    value: number;
    element: React.ReactNode;
}

const CreateBookSteps: CreateBookStepProps[] = [
    {
        value: 0,
        element: <SelectPlace />,
    },
    {
        value: 1,
        element: <div>Step 2</div>,
    },
    {
        value: 2,
        element: <div>Step 3</div>,
    },
];

export function getCreateBookStep(value: number) {
    return CreateBookSteps.find((s) => s.value === value);
}
