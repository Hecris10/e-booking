import { Skeleton } from '~/components/ui/skeleton';

const PlaceCardsSkeleton = () => {
    return (
        <div className="w-full max-h-[75vh] overflow-auto mt-0 grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <div className="flex w-full flex-col gap-3 bg-slate-300 animate-pulse p-3 rounded-lg ">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-[200px]" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="w-[50%] h-6 ml-auto mx-auto" />
                    <Skeleton className="w-[50%] h-6 ml-auto mr-0" />
                </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-300 animate-pulse p-3 rounded-lg ">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-[200px]" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="w-[50%] h-6 ml-auto mx-auto" />
                    <Skeleton className="w-[50%] h-6 ml-auto mr-0" />
                </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-300 animate-pulse p-3 rounded-lg ">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-[200px]" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="w-[50%] h-6 ml-auto mx-auto" />
                    <Skeleton className="w-[50%] h-6 ml-auto mr-0" />
                </div>
            </div>
            <div className="flex flex-col gap-3 bg-slate-300 animate-pulse p-3 rounded-lg ">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-[200px]" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="w-[50%] h-6 ml-auto mx-auto" />
                    <Skeleton className="w-[50%] h-6 ml-auto mr-0" />
                </div>
            </div>
        </div>
    );
};

export default PlaceCardsSkeleton;
