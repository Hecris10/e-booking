import { useSetAtom } from 'jotai';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { cn } from '~/lib/utils';
import { IBookingView } from '~/services/booking-service';
import { editBookingAtom } from '~/services/state-atoms';
import { getCardStatusBadge, getCardStatusColor } from './badge-utils';
import ExpandableToggleBookinCard from './expand-toggle-booking-card';

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
                        <ExpandableToggleBookinCard
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
                            <div className="my-auto p-0">
                                <Image
                                    className="rounded-md"
                                    alt={booking.placeName}
                                    width={200}
                                    priority
                                    height={125}
                                    src={booking.placeImages[0]}
                                />
                            </div>
                            <div className="h-full flex flex-col justify-center my-auto ">
                                <h1 className="font-bold text-titlecolor text-md md:text-2xl">
                                    {booking.placeName}
                                </h1>
                                <div className="flex gap-2">
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

export default BookingCard;
