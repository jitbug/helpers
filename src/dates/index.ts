import { Moment, unitOfTime } from 'moment-timezone';
import { createRange } from '../arrays';
import { Time, TimeLike } from '../time';

type _moment = typeof import('moment') | typeof import('moment-timezone');

let moment: _moment;

/**
 * Set a reference for `moment` to be used by some of the date helpers, so that this library doesn't need to ship its own `moment.js` bundle (for bundle size reasons).
 *
 * This needs to be done before using any of the `moment.js` related date helpers. A good place to do this is in an app initialization script (e. g. for Stencil apps, that would be the `globalScript`).
 */
export const setMomentReference = (momentRef: _moment) => {
	moment = momentRef;
};

/**
 * Merges the time of a date into another date.
 *
 * @param date The date to merge the time into
 * @param time The time to merge into the date
 */
export const mergeDateAndTime = (date: Moment | string, time: Time) => {
	const [hours, minutes] = time.toString().split(':').map(Number);

	return moment(date).startOf('day').set({ hours, minutes });
};

/**
 * Convert minutes to milliseconds.
 */
export const minsToMs = (mins: number) => mins * 60 * 1000;

/**
 * Convert milliseconds to decimal hours.
 */
export const msToDecimalHours = (ms: number) => parseFloat((ms / 1000 / 60 / 60).toFixed(2));

/**
 * Get the amount of worked hours as a decimal.
 */
export const getWorkedHours = (start: Moment, end: Moment, breakMinutes: number) => {
	const diff = end.valueOf() - start.valueOf() - minsToMs(breakMinutes);

	return msToDecimalHours(diff);
};

/**
 * Get a function to pass to `Array#sort` to sort an array of objects by date.
 *
 * @param key the key name of the date to sort by
 */
export const sortByDate = <K extends string>(key: K) => <T extends { [key in K]: Moment }>(a: T, b: T) =>
	a[key].diff(b[key]);

/**
 * Format a date as a timestamp depending on how long ago it was.
 */
export const formatAsTimestamp = (date: Moment) => {
	if (!moment().isSame(date, 'year')) {
		return moment(date).format('ddd LL, LT');
	}

	if (date.isSame(moment(), 'day')) {
		return moment(date).fromNow();
	}

	return moment().diff(date, 'days') < 7 ? date.calendar() : date.format('ddd D MMMM, LT');
};

/**
 * Format a date as day and month without the year, respecting the current locale (hopefully this works).
 *
 * @todo needs a test
 */
export const formatAsDayAndMonth = (date: Moment, format: 'l' | 'L' | 'll' | 'LL' = 'l') =>
	date
		.format(format)
		.replace(date.format('Y'), '') // get rid of year
		.trim()
		.replace(/^[-/,.]+/, '') // get rid of left-over date separators at beginning
		.replace(/[-/,]+$/, '') // get rid of left-over date separators at end
		.trim();

/**
 * Get the next working day, i. e. the next day that's not on a weekend (Sat/Sun).
 */
export const getNextWorkingDay = () => {
	switch (moment().isoWeekday()) {
		case 5:
			return moment().add(3, 'days');

		case 6:
			return moment().add(2, 'days');

		default:
			return moment().add(1, 'day');
	}
};

/**
 * Get the difference between an start an end time.
 */
export const getDuration = (start: TimeLike, end: TimeLike) => new Time(end).add(-new Time(start));

/**
 * Validate a shift's duration. Returns `true` if the shift is valid and `false` otherwise.
 */
export const validateShiftDuration = (start: TimeLike, end: TimeLike, minDurationInMinutes: number | undefined) =>
	!minDurationInMinutes || getDuration(start, end) >= new Time(minDurationInMinutes);

/**
 * Get the dates of the next `n` weeks from the start date. Don't try to use this with a start date that's not a Monday or you will break the internets.
 */
export const getDatesOfNextWeeks = (startOfCurrentWeek: Moment, { n = 2, includeWeekends = false } = {}) =>
createRange(n)
	.map((weekIndex) => moment(startOfCurrentWeek).add(weekIndex, 'weeks'))
	.map((currentWeekDate) =>
		createRange(includeWeekends ? 7 : 5).map((dayIndex) => moment(currentWeekDate).add(dayIndex, 'days')),
	)
	.reduce((allDates, weekDates) => [...allDates, ...weekDates], []);

/**
 * Get the start and end dates of a calendar month, which is the start date of the week that includes the first day of the month, and the end date of the week that includes the last day of the month.
 */
export const getCalendarMonthBoundaries = (month: Moment, weekStartsOnSunday = false) => {
	const start = moment(month).startOf('month').startOf('isoWeek');
	const end = moment(month).endOf('month').endOf('isoWeek');

	if (weekStartsOnSunday) {
		start.subtract(1, 'day');
		end.subtract(1, 'day');

		if (moment(start).add(1, 'week').isSame(moment(month).startOf('month'), 'day')) {
			start.add(1, 'week');
		}

		if (end.isBefore(moment(month).endOf('month'))) {
			end.add(1, 'week');
		}
	}

	return { start, end };
};

/**
 * Check whether the given moment is in the future.
 */
export const isInFuture = (date: Moment | string, granularity?: unitOfTime.StartOf) =>
	moment(date).isAfter(moment(), granularity);

/**
 * Check whether the given moment is in the past.
 */
export const isInPast = (date: Moment | string, granularity?: unitOfTime.StartOf) =>
	moment(date).isBefore(moment(), granularity);
