import { clsx, type ClassValue } from 'clsx';
import { DateRange } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function emailValidation(email: string): boolean {
    return emailRegex.test(email);
}

// only the first letter of each word is capitalized
export function formatTextToTitleCase(text: string): string {
    return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
}

export function formatNumberToUSD(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export const calculateRangeQuantity = (period: DateRange | undefined) => {
    if (period && period.from && period.to) {
        // if the period is the same day, return 1
        if (period.from.toDateString() === period.to.toDateString()) return 1;

        const days = Math.abs(period.to.getTime() - period.from.getTime());
        const daysQuantity = Math.ceil(days / (1000 * 60 * 60 * 24));
        return daysQuantity;
    }
    return 0;
};

export const getDatesFromRange = (initialDate: Date, finalDate: Date) => {
    const dates: Date[] = [];
    let currentDate = new Date(initialDate);
    while (currentDate <= finalDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};
