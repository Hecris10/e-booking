import { SearchIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Input } from './ui/input';

export const SearchInput = ({
    onChange,
    value,
    placeholder,
    className,
}: {
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
    className?: string;
}) => {
    return (
        <div className={cn('relative', className)}>
            <SearchIcon className="absolute top-0 left-0 h-4 w-4 m-2" />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Search'}
                className="pl-8"
            />
        </div>
    );
};
