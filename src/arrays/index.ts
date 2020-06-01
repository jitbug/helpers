import { getByPath } from '../utils';

/**
 * Create a numeric array for the given range.
 *
 * @example
 * // creates an array with n elements 0...(n - 1)
 * createRange(n)
 * createRange(3) // => [0, 1, 2]
 * createRange(1) // => [0]
 * createRange(0) // => []
 * createRange(-1) // => RangeError: Invalid array length
 *
 * @example
 * // creates an array from to (inclusive)
 * createRange(from, to)
 * createRange(1, 3) // => [1, 2, 3]
 * createRange(-2, 2) // => [-2, -1, 0, 1, 2]
 */
export const createRange = (s: number, e = 0) =>
	Array.from(new Array(e ? e - s + 1 : s)).map((_, i) => (e ? s + i : i));

/**
 * Calculate the sum of a numeric array.
 */
export const getArraySum = (array: number[]) => array.reduce((acc, val) => acc + val, 0);

/**
 * Remove an item from an array (returns a new array).
 */
export const removeFromArray = <T>(array: T[], item: T) => {
	const i = array.indexOf(item);

	return i === -1 ? array.slice() : [...array.slice(0, i), ...array.slice(i + 1)];
};

/**
 * Get the last element of an array.
 */
export const getLastElement = <T>(array: T[]) => array[array.length - 1];

/**
 * Get the previous sibling of an array element.
 */
export const getPrevSibling = <T>(array: (T | undefined)[], item: T | undefined) => getSibling(array, item, -1);

/**
 * Get the next sibling of an array element.
 */
export const getNextSibling = <T>(array: (T | undefined)[], item: T | undefined) => getSibling(array, item, +1);

/**
 * Get the nth sibling of an array element.
 */
const getSibling = <T>(array: (T | undefined)[], item: T | undefined, n: number) => array[array.indexOf(item) + n];

/**
 * Use a Set to get only the unique values of an array.
 */
export const makeArrayUnique = <T>(array: T[]) => Array.from(new Set(array));

/**
 * Get the count of elements of an array that pass the filter, and return either the count or the limit (whatever is smaller) as a string. The default limit is 99.
 *
 * If no limit should be applied, pass `0` as the limit.
 */
export const getCountWithLimit = <T>(array: T[], filterFn: (value: T) => boolean, limit = 99) => {
	const count = array.filter(filterFn).length;

	if (limit !== 0 && count > limit) {
		return `${limit}+`;
	}

	if (count > 0) {
		return count.toString();
	}

	return '';
};

/**
 * Reduce an array of objects to an object.
 *
 * @example
 * reduceObjectArrayToObject([{ a: 'foo' }, { b: 'bar' }])
 * // => { a: 'foo', b: 'bar' }
 */
export const reduceObjectArrayToObject = (array: { [key: string]: any }[]) =>
	array.reduce((acc, val) => ({ ...acc, ...val }), {});

/**
 * Get a function that can be passed into `Array#sort` to sort an array of objects by the given key.
 */
export const sortByKey = (key: string) => <T = { [key: string]: any }>(a: T, b: T) =>
	getByPath(a, key) < getByPath(b, key) ? -1 : getByPath(a, key) > getByPath(b, key) ? 1 : 0;

/**
 * Flatten an array.
 */
export const flatten = <T = any>(array: T[][]) => array.reduce((acc, val) => [...acc, ...val], []);
