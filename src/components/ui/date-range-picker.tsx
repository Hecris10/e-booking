'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

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
}: {
    placeHolder?: string;
    defaultValue?: DateRange;
    date: DateRange | undefined;
    onSelect: (date: DateRange | undefined) => void;
    className?: string;
    disabledDates?: Date[];
}) => {
    return (
        <div className={cn(className, 'grid gap-2')}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
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
                        onSelect={onSelect}
                        numberOfMonths={2}
                        modifiers={{
                            disabled: [{ before: today }, ...(disabledDates || [])],
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
export default DateRangePicker;
