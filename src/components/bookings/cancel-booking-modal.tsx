import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { cn } from '~/lib/utils';
import { BookingStatus } from '~/services/booking-service';
import { getCardStatusColor } from './badge-utils';

import { useAtom, useSetAtom } from 'jotai';
import { deleteBookingAtom, editBookingAtom } from '~/state/state-atoms';

const DeleteBookingModal = () => {
    const [booking, setBooking] = useAtom(editBookingAtom);
    const deletBooking = useSetAtom(deleteBookingAtom);

    const { bgColor, borderColor } = getCardStatusColor(BookingStatus.Canceled);

    const handleCancelBooking = async () => {
        if (booking) {
            deletBooking({ ...booking.booking, status: BookingStatus.Canceled });
        }
    };

    return (
        <Dialog open={booking !== undefined && booking.mode === 'delete'}>
            <DialogContent
                className={cn(
                    'sm:max-w-[425px] w-[95%] transition-all duration-1000',
                    bgColor,
                    borderColor
                )}>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>{`This action CAN NOT be undone!!!`}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="w-full flex gap-2 justify-end">
                    <Button
                        className="bg-transparent border-none hover:border hover:border-gray hover:shadow-md"
                        variant={'ghost'}
                        onClick={() => setBooking(undefined)}>
                        Close
                    </Button>
                    <Button predefinition="login" onClick={handleCancelBooking}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteBookingModal;
