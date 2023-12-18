import { useSetAtom } from 'jotai';
import { BookMarkedIcon } from 'lucide-react';
import Ghost from '~/components/ghost';
import { mainTabAtom } from '~/state/state-atoms';

const AddNewBooking = () => {
    const setTabAtom = useSetAtom(mainTabAtom);
    return (
        <div className="w-full my-2 flex flex-col mx-auto overflow-hidden">
            <div
                onClick={() => setTabAtom('new')}
                className="flex gap-2 justify-center align-middle hover:scale-105 active:scale-95 transition-all duration-150">
                {' '}
                <BookMarkedIcon className="my-auto h-4 w-4 text-lightblue" />{' '}
                <h1 className="text-lg cursor-pointer text-center text-lightblue hover:underline">
                    Nothing here... Clicke to Select your next destination!!!
                </h1>
            </div>

            <Ghost />
        </div>
    );
};
export default AddNewBooking;
