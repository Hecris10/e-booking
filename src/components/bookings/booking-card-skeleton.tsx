import { Skeleton } from '../ui/skeleton';

const BookinCardsSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 align-middle justify-start">
            <div className="bg-slate-300 animate-pulse gap-3 border h-[150px] rounded-lg flex align-middle justify-start overflow-hidden shadow-lg px-2 py-2">
                <Skeleton className="h-full my-auto w-[70%] md:w-[250px] rounded-lg shadow-lg" />
                <div className="w-full flex flex-col gap-2 my-auto justify-center align-top">
                    <Skeleton className="w-[50%] h-6" />
                    <Skeleton className="w-24 h-6" />
                </div>
            </div>
            <div className="bg-slate-300 animate-pulse gap-3 border h-[150px] rounded-lg flex align-middle justify-start overflow-hidden shadow-lg px-2 py-2">
                <Skeleton className="h-full my-auto w-[70%] md:w-[250px] rounded-lg shadow-lg" />
                <div className="w-full flex flex-col gap-2 my-auto justify-center align-top">
                    <Skeleton className="w-[50%] h-6" />
                    <Skeleton className="w-24 h-6" />
                </div>
            </div>
            <div className="bg-slate-300 animate-pulse gap-3 border h-[150px] rounded-lg flex align-middle justify-start overflow-hidden shadow-lg px-2 py-2">
                <Skeleton className="h-full my-auto w-[70%] md:w-[250px] rounded-lg shadow-lg" />
                <div className="w-full flex flex-col gap-2 my-auto justify-center align-top">
                    <Skeleton className="w-[50%] h-6" />
                    <Skeleton className="w-24 h-6" />
                </div>
            </div>
        </div>
    );
};

export default BookinCardsSkeleton;
