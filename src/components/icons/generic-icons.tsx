import { Plus } from 'lucide-react';
import { cn } from '~/lib/utils';

export const AddIcon = ({ className }: { className?: string }) => (
    <div
        className={cn(
            className,
            ' bg-lightblue rounded-full w-10 h-8 flex justify-center align-middle shadow-lg'
        )}>
        <Plus className="text-white m-auto" />
    </div>
);
