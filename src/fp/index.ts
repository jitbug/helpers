/**
 * Compose the passed in functions.
 */
export function compose<T1, T2, T3>(f: (x: T2) => T3, g: (x: T1) => T2): (x: T1) => T3;
export function compose<T1, T2, T3, T4>(f: (x: T3) => T4, g: (x: T2) => T3, h: (x: T1) => T2): (x: T1) => T4;
export function compose<T1, T2, T3, T4, T5>(
	f: (x: T4) => T5,
	g: (x: T3) => T4,
	h: (x: T2) => T3,
	k: (x: T1) => T2,
): (x: T1) => T5;
export function compose(...functions: any[]) {
	return (data: any) => functions.reduceRight((value, func) => func(value), data);
}

/**
 * Create a pipe of the passed in functions.
 */
export function pipe<T1, T2, T3>(f: (x: T1) => T2, g: (x: T2) => T3): (x: T1) => T3;
export function pipe<T1, T2, T3, T4>(f: (x: T1) => T2, g: (x: T2) => T3, h: (x: T3) => T4): (x: T1) => T4;
export function pipe<T1, T2, T3, T4, T5>(
	f: (x: T1) => T2,
	g: (x: T2) => T3,
	h: (x: T3) => T4,
	k: (x: T4) => T5,
): (x: T1) => T5;
export function pipe(...functions: any[]) {
	return (data: any) => functions.reduce((value, func) => func(value), data);
}

/**
 * Create a function that plucks a property out of an object.
 */
export const pluck = <T, K extends keyof T>(key: K) => (obj: T) => obj[key];

/**
 * Create a function that checks whether a plucked value is equal to the given value.
 */
export const is = <T, K extends keyof T>(key: K, value: T[K]) => (obj: T) => obj[key] === value;

/**
 * Create a function that checks whether a plucked value is not equal to the given value.
 */
export const isNot = <T, K extends keyof T>(key: K, value: T[K]) => (obj: T) => obj[key] !== value;

/**
 * Same as `Boolean` but acts as a type guard/"null check".
 *
 * @todo get rid of this once Typescript supports it
 * @see https://github.com/Microsoft/TypeScript/pull/29955
 */
export const Bool = <T>(value: T): value is Exclude<T, false | null | undefined | '' | 0> => Boolean(value); // tslint:disable-line: no-unnecessary-callback-wrapper variable-name

/**
 * Do nothing.
 */
export const noop = () => {}; // tslint:disable-line: no-empty

export const isEnabled = <T extends { enabled?: boolean }>({ enabled }: T) => Boolean(enabled);
export const isDisabled = <T extends { enabled?: boolean }>({ enabled }: T) => !enabled;

export const isSelected = <T extends { selected?: boolean }>({ selected }: T) => Boolean(selected);
export const isDeselected = <T extends { selected?: boolean }>({ selected }: T) => !selected;

export const isChecked = <T extends { checked?: boolean }>({ checked }: T) => Boolean(checked);
export const isUnchecked = <T extends { checked?: boolean }>({ checked }: T) => !checked;

export const isVisible = <T extends { visible?: boolean }>({ visible }: T) => Boolean(visible);
export const isInvisible = <T extends { visible?: boolean }>({ visible }: T) => !visible;

/**
 * Return the value if it's set, or the default value otherwise
 */
export const getValueOrDefault = <T>(value: T | undefined, defaultValue: T) =>
	value === undefined || value === null ? defaultValue : value;
