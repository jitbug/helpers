import { Moment } from 'moment-timezone';

/**
 * Allowed types to construct a time from.
 */
export type TimeLike = number | string | Moment | Time;

/**
 * A time represents the hours and minutes of a day and can therefore be
 * somewhere in between `00:00` and `23:59`.
 *
 * The time's value is immutable, thus all methods that modify the time return a
 * new Time instance.
 *
 * Internally, the time's value is stored as a number of minutes. There's no
 * implementation for seconds as it's not required in the context of this app.
 */
export class Time {
	private readonly value: number;

	constructor(arg?: TimeLike) {
		switch (typeof arg) {
			case 'number':
				if (arg < 0 || arg >= 1440) {
					throw new RangeError('The time has to be between 00:00 and 23:59.');
				}

				this.value = arg;
				return;

			case 'string':
				const match = arg.match(/^(\d{2}):(\d{2})$/);

				if (!match) {
					throw new Error('If time is constructed from a string, it has to be in format "HH:mm".');
				}

				this.value = Number(match[1]) * 60 + Number(match[2]);
				return;

			case 'object':
				if (arg instanceof Time) {
					this.value = arg.value;
				} else {
					if (!arg.isValid()) {
						throw new Error('Cannot construct time from invalid moment.');
					}

					this.value = arg.hours() * 60 + arg.minutes();
				}

				return;

			default:
				this.value = 0;
		}
	}

	/**
	 * Add a number of minutes and return a new Time instance with the new value.
	 *
	 * This is circular, e. g. when removing 10 minutes from 00:05, the resulting
	 * time will be 23:55, and when adding 10 mins to 23:55, it will be 00:05.
	 */
	add(mins: number) {
		let newValue = (this.value + mins) % 1440;

		if (newValue < 0) {
			newValue += 1440;
		}

		return new Time(newValue);
	}

	/**
	 * Same as `add` but subtracts the number of minutes.
	 */
	subtract(mins: number) {
		return this.add(-mins);
	}

	valueOf() {
		return this.value;
	}

	toJSON() {
		return this.value;
	}

	toString() {
		const mins = this.value % 60;
		const hours = (this.value - mins) / 60;

		return [hours, mins].map((val) => String(val).padStart(2, '0')).join(':');
	}
}
