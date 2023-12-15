import { BookMarkedIcon } from 'lucide-react';
import { ReactElement, useRef } from 'react';
import RateStars from '~/components/rate-stars';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { BookingStatus } from '~/services/booking-service';
import { getCardStatusColor } from './badge-utils';

type ConfirmBookingModalDialogProps = {
    startDate: Date | undefined;
    endDate: Date | undefined;
    headerText: string;
    text: string;
    confirmAction: (rate?: number) => void;
    isRate?: boolean;
    isCancel?: boolean;
    children?: ReactElement;
    confirmText: string;
    isDanger?: boolean;
};

const ConfirmBookingModalDialog = ({
    startDate,
    endDate,
    text,
    headerText,
    confirmAction,
    confirmText,
    isRate,
    isCancel,
    children,
    isDanger,
}: ConfirmBookingModalDialogProps) => {
    const rate = useRef<number>(0);

    const { bgColor, borderColor } = getCardStatusColor(BookingStatus.Canceled);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button predefinition="login" variant="default">
                        <BookMarkedIcon className="mr-1 h-4 w-4 -translate-x-1" />
                        Save
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent
                className={cn(isDanger ? bgColor + ' ' + borderColor : 'bg-blue-50')}>
                {startDate && endDate ? (
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">{headerText}</AlertDialogTitle>

                        <AlertDialogDescription className="italic">{text}</AlertDialogDescription>
                        {isRate && (
                            <RateStars
                                isSelectable
                                onSelect={(updatedRate) => (rate.current = updatedRate)}
                            />
                        )}
                    </AlertDialogHeader>
                ) : (
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            You should select a start and an end date!!!
                        </AlertDialogTitle>
                        {/* <AlertDialogDescription className="italic">
                            {`Attention: You have 24 hours before the start date ${startDate?.toLocaleDateString()} to confirm your booking`}
                            .
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>
                )}
                <AlertDialogFooter>
                    {startDate && endDate && isCancel && (
                        <AlertDialogCancel asChild>
                            <Button
                                className="bg-blue-50 border-none hover:border hover:border-gray hover:shadow-md"
                                variant={'ghost'}>
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                    )}
                    {startDate && endDate ? (
                        <AlertDialogAction
                            onClick={() => confirmAction(rate.current)}
                            className="bg-yellow text-lightblue">
                            {confirmText}
                        </AlertDialogAction>
                    ) : (
                        <AlertDialogAction className="bg-yellow text-lightblue">
                            Okay
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmBookingModalDialog;
