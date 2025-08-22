import { calculateDaysBetweenDates } from '../src/calculateDays';
import { describe, it, expect } from 'vitest';

describe('Date Calculation', () => {
    it('should calculate correct days between dates', () => {
        const date1 = new Date('2023-01-01');
        const date2 = new Date('2023-01-05');
        expect(calculateDaysBetweenDates(date1, date2)).toBe(4);
    });

    it('should handle reversed dates', () => {
        const date1 = new Date('2023-01-05');
        const date2 = new Date('2023-01-01');
        expect(calculateDaysBetweenDates(date1, date2)).toBe(4);
    });
});