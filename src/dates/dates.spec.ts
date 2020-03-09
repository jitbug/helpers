import { Time } from '../time';
import {
	formatAsDayAndMonth,
	formatAsTimestamp,
	getCalendarMonthBoundaries,
	getWorkedHours,
	mergeDateAndTime,
	minsToMs,
	msToDecimalHours,
} from '.';

declare const moment: typeof import('moment-timezone');

describe('Date Helpers', () => {
	describe('mergeDateAndTime(date, time)', () => {
		it('should return a moment with the date of "date" and the time of "time"', () => {
			const data = [
				{
					date: moment('2018-01-01T00:00:00'),
					time: moment('2019-12-31T15:30:45'),
					expected: moment('2018-01-01T15:30:00'),
				},
				{
					date: moment('2018-01-01T00:00:00'),
					time: moment('2018-01-01T01:02:03'),
					expected: moment('2018-01-01T01:02:00'),
				},
				{
					date: moment('2018-01-01T00:00:00'),
					time: moment('2017-12-31T15:30:45'),
					expected: moment('2018-01-01T15:30:00'),
				},
				{
					date: moment().startOf('day'),
					time: moment()
						.startOf('day')
						.add(10, 'hours'),
					expected: moment()
						.startOf('day')
						.add(10, 'hours'),
				},
			];

			for (const el of data) {
				expect(mergeDateAndTime(el.date, new Time(el.time)).format()).toBe(el.expected.format());
			}
		});
	});

	describe('minsToMs(number)', () => {
		it('should convert the number of minutes to milliseconds', () => {
			expect(minsToMs(0)).toBe(0);
			expect(minsToMs(1)).toBe(60000);
			expect(minsToMs(123)).toBe(7380000);
			expect(minsToMs(-123)).toBe(-7380000);
		});
	});

	describe('msToDecimalHours(number)', () => {
		it('should convert milliseconds to decimal hours', () => {
			expect(msToDecimalHours(0)).toBe(0);
			expect(msToDecimalHours(1000)).toBe(0);
			expect(msToDecimalHours(60000)).toBe(0.02);
			expect(msToDecimalHours(360000)).toBe(0.1);
			expect(msToDecimalHours(600000)).toBe(0.17);
			expect(msToDecimalHours(900000)).toBe(0.25);
			expect(msToDecimalHours(1800000)).toBe(0.5);
			expect(msToDecimalHours(3600000)).toBe(1);
			expect(msToDecimalHours(-3600000)).toBe(-1);
		});
	});

	describe('getWorkedHours(start, end, break)', () => {
		it('should calculate the hours worked from start, end and break minutes', () => {
			expect(getWorkedHours(moment('2018-10-17T08:30:00'), moment('2018-10-17T17:00:00'), 30)).toBe(8);
			expect(getWorkedHours(moment('2018-10-17T08:30:00'), moment('2018-10-17T17:00:00'), 0)).toBe(8.5);
			expect(getWorkedHours(moment('2018-10-17T22:00:00'), moment('2018-10-18T06:00:00'), 30)).toBe(7.5);
		});
	});

	describe('formatAsTimestamp(date)', () => {
		it('should format moment as timestamp', () => {
			expect(formatAsTimestamp(moment())).toBe('a few seconds ago');
			expect(formatAsTimestamp(moment().subtract(10, 'minutes'))).toBe('10 minutes ago');
			expect(formatAsTimestamp(moment().subtract(1, 'day'))).toContain('Yesterday');
			expect(formatAsTimestamp(moment().subtract(2, 'day'))).toContain('Last');
			expect(formatAsTimestamp(moment('2000-01-01'))).toBe('Sat January 1, 2000, 12:00 AM');
		});
	});

	describe('formatAsDayAndMonth(date, format)', () => {
		it('should format as day and month', () => {
			const dateWithEnUsLocale = moment('2000-01-02').locale('en');

			expect(formatAsDayAndMonth(dateWithEnUsLocale, 'l')).toBe('1/2');
			expect(formatAsDayAndMonth(dateWithEnUsLocale, 'L')).toBe('01/02');
			expect(formatAsDayAndMonth(dateWithEnUsLocale, 'll')).toBe('Jan 2');
			expect(formatAsDayAndMonth(dateWithEnUsLocale, 'LL')).toBe('January 2');

			const dateWithNzLocale = moment('2000-01-02').locale('en-nz');

			expect(formatAsDayAndMonth(dateWithNzLocale, 'l')).toBe('2/1');
			expect(formatAsDayAndMonth(dateWithNzLocale, 'L')).toBe('02/01');
			expect(formatAsDayAndMonth(dateWithNzLocale, 'll')).toBe('2 Jan');
			expect(formatAsDayAndMonth(dateWithNzLocale, 'LL')).toBe('2 January');

			const dateWithDeLocale = moment('2000-01-02').locale('de');

			expect(formatAsDayAndMonth(dateWithDeLocale, 'l')).toBe('2.1.');
			expect(formatAsDayAndMonth(dateWithDeLocale, 'L')).toBe('02.01.');
			expect(formatAsDayAndMonth(dateWithDeLocale, 'll')).toBe('2. Jan.');
			expect(formatAsDayAndMonth(dateWithDeLocale, 'LL')).toBe('2. Januar');
		});
	});

	describe('getCalendarMonthBoundaries(month, weekStartsOnSunday)', () => {
		it('should get the correct boundaries with weeks starting on Mondays', () => {
			const month = moment('2019-12-01');

			const { start, end } = getCalendarMonthBoundaries(month);

			expect(start).toBeSameDay(moment('2019-11-25'));
			expect(end).toBeSameDay(moment('2020-01-05'));
		});

		it('should get the correct boundaries with weeks starting on Sundays', () => {
			const month = moment('2019-12-01');

			const { start, end } = getCalendarMonthBoundaries(month, true);

			expect(start).toBeSameDay(moment('2019-12-01'));
			expect(end).toBeSameDay(moment('2020-01-04'));
		});
	});
});
