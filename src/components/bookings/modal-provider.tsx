'use client';
import { useAtom } from 'jotai';
import { editBookingAtom } from '~/state/state-atoms';
import DeleteBookingModal from './cancel-booking-modal';
import EditBookingModal from './edit-booking-modal';

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [bookingEdit, setBookingEdit] = useAtom(editBookingAtom);
    return (
        <>
            <EditBookingModal />
            <DeleteBookingModal />
            {children}
        </>
    );
}
