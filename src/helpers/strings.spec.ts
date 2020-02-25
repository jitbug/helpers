import {
	bytes,
	filterAndJoin,
	formatBytes,
	getInitials,
	pascalToCamelCase,
	toOrdinal,
	toStringOrEmptyString,
	toTitleCase,
} from './strings';

describe('String Helpers', () => {
	describe('toStringOrEmptyString(value)', () => {
		it('should call .toString()', () => {
			expect(toStringOrEmptyString('')).toBe('');
			expect(toStringOrEmptyString('foo')).toBe('foo');

			expect(toStringOrEmptyString(0)).toBe('0');
			expect(toStringOrEmptyString(123)).toBe('123');
			expect(toStringOrEmptyString(NaN)).toBe('NaN');
			expect(toStringOrEmptyString(Infinity)).toBe('Infinity');

			expect(toStringOrEmptyString([])).toBe('');
			expect(toStringOrEmptyString(['foo', 'bar'])).toBe('foo,bar');

			expect(toStringOrEmptyString({})).toBe('[object Object]');
			expect(toStringOrEmptyString({ foo: 'bar' })).toBe('[object Object]');
			expect(toStringOrEmptyString({ toString: () => '42' })).toBe('42');
		});

		it('should return an empty string', () => {
			expect(toStringOrEmptyString(undefined)).toBe('');
			expect(toStringOrEmptyString(null)).toBe(''); // tslint:disable-line: no-null-keyword
		});
	});

	describe('toTitleCase(string)', () => {
		it('should return a title case version of the string', () => {
			expect(toTitleCase('')).toBe('');
			expect(toTitleCase('string')).toBe('String');
			expect(toTitleCase('String')).toBe('String');
			expect(toTitleCase('STRING')).toBe('String');
			expect(toTitleCase('dOnAlD tRuMp Is LOCO.')).toBe('Donald Trump Is Loco.');
		});
	});

	describe('pascalToCamelCase(string)', () => {
		it('should convert a string from pascal to camel case', () => {
			expect(pascalToCamelCase('')).toBe('');
			expect(pascalToCamelCase('Foo')).toBe('foo');
			expect(pascalToCamelCase('FooBar')).toBe('fooBar');
			expect(pascalToCamelCase('Id')).toBe('id');
			expect(pascalToCamelCase('ID')).toBe('id');
			expect(pascalToCamelCase('CV')).toBe('cv');
		});
	});

	describe('getInitials(string)', () => {
		it('should return the initials of the string', () => {
			expect(getInitials('')).toBe('');
			expect(getInitials('Donald Trump')).toBe('DT');
			expect(getInitials('donald trump')).toBe('DT');
		});
	});

	describe('toOrdinal(number)', () => {
		it('should return the ordinal representation of a number', () => {
			expect(toOrdinal(1)).toBe('1st');
			expect(toOrdinal(2)).toBe('2nd');
			expect(toOrdinal(3)).toBe('3rd');
			expect(toOrdinal(4)).toBe('4th');
			expect(toOrdinal(11)).toBe('11th');
			expect(toOrdinal(12)).toBe('12th');
			expect(toOrdinal(21)).toBe('21st');
			expect(toOrdinal(32)).toBe('32nd');
			expect(toOrdinal(43)).toBe('43rd');
			expect(toOrdinal(55)).toBe('55th');
		});
	});

	describe('filterAndJoin(strings, separator)', () => {
		it('should filter and join strings', () => {
			expect(filterAndJoin(['foo', 'bar'])).toBe('foo, bar');
			expect(filterAndJoin(['foo', 'bar'], '')).toBe('foobar');
			expect(filterAndJoin(['foo', false, undefined, '', 'bar'])).toBe('foo, bar');
			expect(filterAndJoin(['foo', 'bar'], '-')).toBe('foo-bar');
			expect(filterAndJoin(['foobar'])).toBe('foobar');
		});
	});

	describe('bytes', () => {
		it('should convert a string to a number of bytes', () => {
			expect(bytes('1 B')).toBe(1);
			expect(bytes('1 kB')).toBe(1000);
			expect(bytes('1 KiB')).toBe(1024);
			expect(bytes('1 MiB')).toBe(1048576);
			expect(bytes('3 MB')).toBe(3000000);
			expect(bytes('3.5 MB')).toBe(3500000);
			expect(bytes('8.88 GB')).toBe(8880000000);
		});
	});

	describe('formatBytes', () => {
		it('should format a number of bytes in a human-readable format', () => {
			expect(formatBytes(1000)).toBe('1 kB');
			expect(formatBytes(1024)).toBe('1.02 kB');
			expect(formatBytes(1337)).toBe('1.34 kB');
			expect(formatBytes(1500)).toBe('1.5 kB');
			expect(formatBytes(29000000)).toBe('29 MB');
			expect(formatBytes(12345678910)).toBe('12.35 GB');
			expect(formatBytes(88888888888888888)).toBe('88888888.89 GB');
		});
	});
});
