import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '~/lib/utils';

type isSelectable = { isSelectable: true; onSelect: (rate: number) => void };
type isNotSelectable = { isSelectable: false };

type RaceStarsProps = { defaultRate?: number } & (isSelectable | isNotSelectable);

const RateStars = (props: RaceStarsProps) => {
    const { isSelectable, defaultRate } = props;
    const [rate, setRate] = useState<number>(defaultRate || 0);

    const handleSelect = (rate: number) => {
        if (isSelectable) {
            setRate(rate + 1);
            props.onSelect(rate + 1);
        }
    };

    return (
        <div className="flex justify-center">
            <div
                className={cn(
                    'flex items-center gap-1 space-x-1 text-gray-400 text-3xl',
                    isSelectable && 'cursor-pointer'
                )}>
                {Array.from(Array(5).keys()).map((r) => (
                    <StarIcon
                        onClick={() => isSelectable && handleSelect(r)}
                        key={r}
                        className={cn(
                            isSelectable && 'hover:scale-125',
                            'transform transition-all duration-200',
                            r < rate ? 'fill-yellow text-yellow' : 'text-gray',
                            isSelectable && r >= rate && 'hover:text-black'
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default RateStars;
