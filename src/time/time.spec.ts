import moment from 'moment-timezone';
import { Time } from '.';

describe('Time', () => {
	describe('toString()', () => {
		it('should correctly format the time', () => {
			expect(new Time().toString()).toBe('00:00');
			expect(new Time(1234).toString()).toBe('20:34');
		});
	});

	describe('valueOf()', () => {
		it('should correctly return the value', () => {
			expect(new Time().valueOf()).toBe(0);
			expect(new Time(1234).valueOf()).toBe(1234);
		});
	});

	describe('toJSON()', () => {
		it('should return the same as .valueOf()', () => {
			expect(new Time().toJSON()).toBe(new Time().valueOf());
			expect(new Time(1234).toJSON()).toBe(new Time(1234).valueOf());
		});
	});

	describe('new Time(TimeLike) constructor', () => {
		it('should be constructible from string', () => {
			expect(new Time('12:34').toString()).toBe('12:34');
		});

		it('should throw error if time is constructed from invalid string', () => {
			expect(() => new Time('1234')).toThrowError(
				'If time is constructed from a string, it has to be in format "HH:mm".',
			);
		});

		it('should be constructible from number', () => {
			expect(new Time(1234).toString()).toBe('20:34');
		});

		it('should throw range error if time is constructed from invalid number', () => {
			const fixtures = [-123, 12345];

			for (const fixture of fixtures) {
				expect(() => new Time(fixture)).toThrowError('The time has to be between 00:00 and 23:59.');
			}
		});

		it('should be constructible from a moment', () => {
			const now = moment();

			expect(new Time(now).toString()).toBe(now.format('HH:mm'));
		});

		it('should throw error if time is constructed from invalid moment', () => {
			const now = moment(NaN);

			expect(() => new Time(now)).toThrowError('Cannot construct time from invalid moment.');
		});

		it('should be constructible from another Time instance', () => {
			const time = new Time('12:34');

			expect(new Time(time).toString()).toBe('12:34');
		});
	});

	describe('add(diff)', () => {
		it('should return a new Time instance', () => {
			const time1 = new Time();
			const time2 = time1.add(1);

			expect(time1).not.toBe(time2);
		});

		it('should add correctly', () => {
			const time = new Time('09:00');

			expect(time.add(60).toString()).toBe('10:00');
			expect(time.toString()).toBe('09:00');
			expect(time.add(-60).toString()).toBe('08:00');

			expect(time.add(60).add(60).toString()).toBe('11:00');
		});

		it('should cross min correctly', () => {
			const time = new Time('00:05');

			expect(time.add(-10).toString()).toBe('23:55');
		});

		it('should cross max correctly', () => {
			const time = new Time('23:55');

			expect(time.add(10).toString()).toBe('00:05');
		});
	});
});
