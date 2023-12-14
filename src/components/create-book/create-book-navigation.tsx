import { useState } from 'react';
import { getCreateBookStep } from './create-book-utils';

export default function CreateBookNavigation() {
    const [step, setState] = useState(0);
    return <>{getCreateBookStep(step)!.element}</>;
}
