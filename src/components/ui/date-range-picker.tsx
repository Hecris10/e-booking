'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const today = new Date();

const modifiers = {
    disabled: { before: today },
};

const DateRangePicker = ({
    placeHolder,
    className,
    disabledDates,
    date,
    onSelect,
    disableBefore,
}: {
    placeHolder?: string;
    defaultValue?: DateRange;
    date: DateRange | undefined;
    onSelect: (date: DateRange | undefined) => void;
    className?: string;
    disabledDates?: Date[];
    disableBefore?: true;
}) => {
    const [open, setOpen] = useState(false);

    const handleSlect = (date: DateRange | undefined) => {
        onSelect(date);
        if (date?.from && date?.to) setOpen(false);
    };

    return (
        <div className={cn(className, 'grid gap-2')}>
            <Popover modal open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        onClick={() => setOpen(open)}
                        variant={'outline'}
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>{placeHolder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        className="w-full"
                        selected={date}
                        onSelect={handleSlect}
                        numberOfMonths={1}
                        disableBefore={disableBefore}
                        disabledDates={disabledDates}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
export default DateRangePicker;
