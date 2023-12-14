import { Archive, CalendarCheck, CalendarCheck2, CalendarClock, CalendarX2 } from 'lucide-react';

export const PendingBadge = () => {
    return (
        <div className="flex justify-center bg-orange-100 shadow-lg align-middle p-4 rounded-full border-2 border-orange-500">
            <CalendarClock className="text-orange-500" />
        </div>
    );
};

export const ConfirmedBadge = () => {
    return (
        <div className="flex justify-center bg-green-100 shadow-lg align-middle p-4 rounded-full border-2 border-green-500">
            <CalendarCheck2 className="text-green-500" />
        </div>
    );
};
export const ConcludedBadge = () => {
    return (
        <div className="flex justify-center bg-blue-100 shadow-lg align-middle p-4 rounded-full border-2 border-blue-500">
            <CalendarCheck className="text-blue-500" />
        </div>
    );
};
export const CanceledBadge = () => {
    return (
        <div className="flex justify-center bg-red-100 shadow-lg align-middle p-4 rounded-full border-2 border-red-500">
            <CalendarX2 className="text-red-500" />
        </div>
    );
};
export const ArchivedBadge = () => {
    return (
        <div className="flex justify-center bg-slate-100 shadow-lg align-middle p-4 rounded-full border-2 border-slate-500">
            <Archive className="text-slate-500" />
        </div>
    );
};
