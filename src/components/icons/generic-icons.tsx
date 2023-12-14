import { Plus } from 'lucide-react';
import { cn } from '~/lib/utils';

export const AddIcon = ({ className }: { className?: string }) => (
    <div
        className={cn(
            className,
            'p-1 bg-lightblue rounded-full h-10 w-10 flex justify-center align-middle shadow-lg'
        )}>
        <Plus className="text-white m-auto" />
    </div>
);
