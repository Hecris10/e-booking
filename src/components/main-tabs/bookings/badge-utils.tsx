import { BookingStatus } from '~/services/booking-service';
import {
    CanceledBadge,
    ConcludedBadge,
    ConfirmedBadge,
    PendingBadge,
} from './booking-status-badge';

export const getCardStatusBadge = (
    status: BookingStatus,
    className?: string
): React.ReactElement => {
    switch (status) {
        case BookingStatus.Pending:
            return <PendingBadge className={className} />;
        case BookingStatus.Confirmed:
            return <ConfirmedBadge className={className} />;
        case BookingStatus.Completed:
            return <ConcludedBadge className={className} />;
        case BookingStatus.Canceled:
            return <CanceledBadge className={className} />;
        // case BookingStatus.Archived:
        //     return <ArchivedBadge className={className} />;
        default:
            return <></>;
    }
};

export const getCardStatusColor = (
    status: BookingStatus
): { bgColor: string; borderColor: string } => {
    switch (status) {
        case BookingStatus.Pending:
            return {
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-400',
            };
        case BookingStatus.Confirmed:
            return {
                bgColor: 'bg-green-50',
                borderColor: 'border-green-300',
            };
        case BookingStatus.Canceled:
            return {
                bgColor: 'bg-red-50',
                borderColor: 'border-red-400',
            };
        case BookingStatus.Completed:
            return {
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-400',
            };
        default:
            return {
                bgColor: 'bg-gray-50',
                borderColor: 'border-white',
            };
    }
};
