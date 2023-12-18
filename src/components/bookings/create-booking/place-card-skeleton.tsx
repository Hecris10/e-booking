import { Skeleton } from '~/components/ui/skeleton';

const PlaceCardsSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 align-middle justify-start">
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
