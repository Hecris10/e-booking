import { Carousel as CarouselArk } from '@ark-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactElement } from 'react';

const Carousel = ({ children }: { children: ReactElement[] }) => {
    return (
        <CarouselArk.Root>
            <CarouselArk.IndicatorGroup>
                {/* {children.map((_, index) => (
                    <CarouselArk.Indicator key={index} index={index}>
                        {index + 1}
                    </CarouselArk.Indicator>
                ))} */}
            </CarouselArk.IndicatorGroup>
            <CarouselArk.Viewport className="relative shadow-md rounded-lg overflow-hidden">
                <CarouselArk.ItemGroup>
                    {children.map((item, index) => (
                        <CarouselArk.Item key={index} index={index}>
                            {item}
                        </CarouselArk.Item>
                    ))}
                </CarouselArk.ItemGroup>
                <CarouselArk.Control className="absolute top-0 w-full h-full flex items-center justify-between">
                    <CarouselArk.PrevTrigger className="carousel-trigger h-full bg-transparent hover:bg-ghost cursor-pointer">
                        <ChevronLeft className="carousel-button h-[40px] w-[40px] text-gray" />
                    </CarouselArk.PrevTrigger>
                    <CarouselArk.NextTrigger className="carousel-trigger h-full bg-transparent hover:bg-ghost cursor-pointer">
                        <ChevronRight className="carousel-button h-[40px] w-[40px] text-gray" />
                    </CarouselArk.NextTrigger>
                </CarouselArk.Control>
            </CarouselArk.Viewport>
        </CarouselArk.Root>
    );
};

export default Carousel;
