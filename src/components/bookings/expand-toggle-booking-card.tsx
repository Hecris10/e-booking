import { ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BookingStatus, IBookingView } from '~/services/booking-service';

const ExpandableToggleBookinCard = ({
    booking,
    openModal,
}: {
    booking: IBookingView;
    openModal: (mode: 'edit' | 'delete') => void;
}) => {
    const [open, setOpen] = useState(false);
    const editRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (editRef.current && !editRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editRef]);

    if (open)
        return (
            <div
                ref={editRef}
                className="flex  left-0 top-0 h-full p-1 flex-col justify-between bg-graytransparent">
                <button
                    onClick={() => openModal('edit')}
                    className="bg-gray p-1 flex justify-center align-middle bg-transparent rounded-md hover:backdrop-blur-md backdrop-sepia-0 hover:scale-105 active:scale-95">
                    <Pencil className="w-8 h-8" />
                </button>
                {booking.status !== BookingStatus.Canceled &&
                    booking.status !== BookingStatus.Completed && (
                        <button
                            name="delete"
                            onClick={() => openModal('delete')}
                            className="bg-gray p-1 flex justify-center align-middle bg-transparent rounded-md hover:backdrop-blur-md backdrop-sepia-0 hover:scale-105 active:scale-95">
                            <Trash2 className="w-8 h-8 text-red-500" />
                        </button>
                    )}
            </div>
        );

    return (
        <div className="flex h-full align-middle ">
            <button name="options-booking" onClick={() => setOpen(true)}>
                <ChevronRight className="my-auto text-slate-300 hover:text-slate-500 transform transition-all duration-300 w-10 h-10 rounded-lg cursor-pointer hover:scale-110  active:scale-90" />
            </button>
        </div>
    );
};

export default ExpandableToggleBookinCard;
