import { Archive, CalendarCheck, CalendarCheck2, CalendarClock, CalendarX2 } from 'lucide-react';
import { cn } from '~/lib/utils';

export const PendingBadge = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'flex justify-center bg-orange-100 shadow-lg align-middle p-1 rounded-full border-2 border-orange-500'
            )}>
            <CalendarClock className={cn(className, 'text-orange-500')} />
        </div>
    );
};

export const ConfirmedBadge = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'flex justify-center bg-green-100 shadow-lg align-middle p-1 rounded-full border-2 border-green-500'
            )}>
            <CalendarCheck2 className={cn(className, 'text-green-500')} />
        </div>
    );
};
export const ConcludedBadge = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'flex justify-center bg-blue-100 shadow-lg align-middle p-1 rounded-full border-2 border-blue-500'
            )}>
            <CalendarCheck className={cn(className, 'text-blue-500')} />
        </div>
    );
};
export const CanceledBadge = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'flex justify-center bg-red-100 shadow-lg align-middle p-1 rounded-full border-2 border-red-500'
            )}>
            <CalendarX2 className={cn(className, 'text-red-500')} />
        </div>
    );
};
export const ArchivedBadge = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'flex justify-center bg-slate-100 shadow-lg align-middle p-1 rounded-full border-2 border-slate-500'
            )}>
            <Archive className={cn(className, 'text-slate-500')} />
        </div>
    );
};
