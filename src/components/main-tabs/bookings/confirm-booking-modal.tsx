import { BookMarkedIcon } from 'lucide-react';
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

const ConfirmBookingModalDialog = ({
    startDate,
    endDate,
    confirmAction,
}: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    confirmAction: () => void;
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button predefinition="login" variant="default">
                    <BookMarkedIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    Save
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-50">
                {startDate && endDate ? (
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">Are sure?</AlertDialogTitle>
                        <AlertDialogDescription className="italic">
                            {`Attention: You have 24 hours before the start date ${startDate.toLocaleDateString()} to confirm your booking`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                ) : (
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                            You should select a start and an end date!!!
                        </AlertDialogTitle>
                        {/* <AlertDialogDescription className="italic">
                            {`Attention: You have 24 hours before the start date ${startDate.toLocaleDateString()} to confirm your booking`}
                            .
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>
                )}
                <AlertDialogFooter>
                    {startDate && endDate && (
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
                            onClick={confirmAction}
                            className="bg-yellow text-lightblue">
                            Continue
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
