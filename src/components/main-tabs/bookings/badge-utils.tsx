import { BookingStatus } from '~/services/booking-service';
import {
    ArchivedBadge,
    CanceledBadge,
    ConcludedBadge,
    ConfirmedBadge,
    PendingBadge,
} from './booking-status-badge';

export const getCardStatusBadge = (status: BookingStatus): React.ReactElement => {
    switch (status) {
        case BookingStatus.Pending:
            return <PendingBadge />;
        case BookingStatus.Confirmed:
            return <ConfirmedBadge />;
        case BookingStatus.Completed:
            return <ConcludedBadge />;
        case BookingStatus.Canceled:
            return <CanceledBadge />;
        case BookingStatus.Archived:
            return <ArchivedBadge />;
        default:
            return <></>;
    }
};

export const getCardStatusColor = (
    status: BookingStatus
): { transparentColor: string; highlightColor: string } => {
    switch (status) {
        case BookingStatus.Pending:
            return {
                transparentColor: 'bg-orange-50',
                highlightColor: 'border-orange-400',
            };
        case BookingStatus.Confirmed:
            return {
                transparentColor: 'bg-green-50',
                highlightColor: 'border-green-300',
            };
        case BookingStatus.Canceled:
            return {
                transparentColor: 'bg-red-50',
                highlightColor: 'border-red-400',
            };
        case BookingStatus.Completed:
            return {
                transparentColor: 'bg-blue-50',
                highlightColor: 'border-blue-400',
            };
        default:
            return {
                transparentColor: 'bg-gray-50',
                highlightColor: 'border-white',
            };
    }
};
