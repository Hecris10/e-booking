'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const DatePicker = ({
    onChange,
    defaultValue,
    placeHolder,
    disabledDates,
}: {
    onChange: (date: Date | undefined) => void;
    placeHolder?: string;
    defaultValue?: Date;
    disabledDates?: Date[];
}) => {
    const [date, setDate] = useState<Date | undefined>(defaultValue);

    const onSelect = (date: Date | undefined) => {
        setDate(date);
        onChange(date);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>{placeHolder || 'Pick a date'}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    disabled={disabledDates}
                    mode="single"
                    selected={date}
                    onSelect={onSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
export default DatePicker;

// <Popover>
// <div className="relative">
//     <Input
//         className="w-full"
//         type="string"
//         value={stringDate}
//         onFocus={() => {
//             if (date) setStringDate(format(date, 'MM/dd/yyyy'));
//         }}
//         onChange={(e) => {
//             if (date) setStringDate('');
//             setStringDate(e.target.value);
//         }}
//         onBlur={(e) => {
//             let parsedDate = new Date(e.target.value);
//             if (parsedDate.toString() === 'Invalid Date') {
//                 setErrorMessage('Invalid Date');
//             } else {
//                 setErrorMessage('');
//                 onSelect(parsedDate);
//                 setStringDate(format(parsedDate, 'PPP'));
//             }
//         }}
//     />
//     {errorMessage !== '' && (
//         <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
//             {errorMessage}
//         </div>
//     )}
//     <PopoverTrigger asChild>
//         <Button
//             variant={'outline'}
//             className={cn(
//                 'font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none',
//                 !date && 'text-muted-foreground'
//             )}>
//             <CalendarIcon className="w-4 h-4" />
//         </Button>
//     </PopoverTrigger>
// </div>
// <PopoverContent align="end" className="w-auto p-0">
//     <Calendar
//         mode="single"
//         captionLayout="dropdown-buttons"
//         selected={date}
//         defaultMonth={date}
//         onSelect={(selectedDate) => {
//             if (!selectedDate) return;
//             onSelect(selectedDate);
//             setStringDate(format(selectedDate, 'PPP'));
//             setErrorMessage('');
//         }}
//         // fromYear={1960}
//         // toYear={2030}
//     />
// </PopoverContent>
// </Popover>
