import { useSetAtom } from 'jotai';
import { Calendar, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import HotelImage from '~/../public/hotel.webp';
import { cn } from '~/lib/utils';
import { IBookingView } from '~/services/booking-service';
import { editBookingAtom } from '~/services/state-atoms';
import { getCardStatusBadge, getCardStatusColor } from './badge-utils';

const BookingCard = ({ booking }: { booking: IBookingView }) => {
    const { bgColor, borderColor } = getCardStatusColor(booking.status);
    const setEditBooking = useSetAtom(editBookingAtom);

    return (
        <article
            className={cn('bg-cardwhite border rounded-lg overflow-hidden shadow-lg', borderColor)}>
            <div className="w-full h-full flex">
                <div
                    className={cn(
                        'flex py-2 px-2 relative w-full h-full justify-start gap-3',
                        bgColor
                    )}>
                    <div className="h-full absolute top-0 left-0">
                        <ExpandableToggleCard
                            booking={booking}
                            openModal={(mode) =>
                                setEditBooking({
                                    booking: booking,
                                    mode: mode,
                                })
                            }
                        />
                    </div>
                    <div className="flex w-full gap-3 ml-7">
                        <div className={cn('flex w-full h-full justify-start gap-3', bgColor)}>
                            <div>
                                <Image
                                    width={200}
                                    className="rounded-md"
                                    alt={booking.placeName}
                                    src={HotelImage}
                                />
                            </div>
                            <div className="h-full flex flex-col justify-center my-auto ">
                                <h1 className="font-bold text-titlecolor text-md md:text-2xl">
                                    {booking.placeName}
                                </h1>
                                <div className="flex justify-between gap-2">
                                    <Calendar className="my-auto hidden md:block h-6 w-6" />{' '}
                                    <div className="flex flex-col md:flex-row md:gap-2 align-middle justify-center my-auto text-sm">
                                        <p>{`${new Date(
                                            booking.startDate
                                        ).toLocaleDateString()}`}</p>
                                        <p>{`${new Date(booking.endDate).toLocaleDateString()}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-0 md:mx-3 my-auto  md:block">
                            {getCardStatusBadge(booking.status, 'h-6 w-6 md:h-12 md:w-12')}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

const ExpandableToggleCard = ({
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
                className="flex  left-0 top-0 h-full p-1 flex-col justify-between  backdrop-blur-sm">
                <button
                    onClick={() => openModal('edit')}
                    className="bg-gray p-1 flex justify-center align-middle bg-transparent rounded-md hover:bg-slate-300 hover:scale-105 active:scale-95">
                    <Pencil className="w-8 h-8" />
                </button>
                <button
                    onClick={() => openModal('delete')}
                    className="bg-gray p-1 flex justify-center align-middle bg-transparent rounded-md hover:bg-slate-300 hover:scale-105 active:scale-95">
                    <Trash2 className="w-8 h-8 text-red-500" />
                </button>
            </div>
        );

    return (
        <div className="flex h-full align-middle">
            <ChevronRight
                onClick={() => setOpen(true)}
                className="my-auto text-slate-300 hover:text-slate-500 transform transition-all duration-300 w-10 h-10 rounded-lg cursor-pointer hover:scale-110  active:scale-90"
            />
        </div>
    );
};

export default BookingCard;
