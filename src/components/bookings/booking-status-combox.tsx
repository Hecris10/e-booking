'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '~/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { BookingStatus, BookingStatusKeys, BookingStatusValues } from '~/services/booking-service';

const bookingStatusOption: ComboBoxSelectProps[] = BookingStatusValues.filter(
    (status) => status.toLocaleLowerCase() !== 'concluded'
).map((placeType, i) => ({
    value: placeType.toLocaleLowerCase(),
    label: BookingStatusKeys[i],
}));

const getStatusEnum = (status: string): BookingStatus => {
    switch (status) {
        case 'pending':
            return BookingStatus.Pending;
        case 'confirmed':
            return BookingStatus.Confirmed;
        case 'completed':
            return BookingStatus.Completed;
        case 'canceled':
            return BookingStatus.Canceled;
        default:
            return BookingStatus.Pending;
    }
};
export interface ComboBoxSelectProps {
    value: string;
    label: string;
}

export function BookingStatusComboBox({
    status,
    onChange,
}: {
    status: BookingStatus | undefined;
    onChange: (status: BookingStatus) => void;
}) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(status?.toString().toLowerCase() || '');

    // useEffect(() => {
    //     if (status !== value) setValue(status?.toString() || '');
    // }, [status, value]);

    const handleSelect = (currentValue: string) => {
        setValue(currentValue);
        onChange(getStatusEnum(currentValue));
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between">
                    {value
                        ? bookingStatusOption.find((status) => status.value === value)?.label
                        : 'Select Status...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {bookingStatusOption.map((status) => (
                            <CommandItem
                                key={status.value}
                                value={status.value}
                                onSelect={handleSelect}>
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === status.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                                {status.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
