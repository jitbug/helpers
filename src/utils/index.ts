import { removeDataUrlPrefix } from '../strings';

/**
 * Return an object that can hold a reference to an element and exposes a setter for that reference.
 *
 * @example
 * export class MyComp {
 *   div = useRef();
 *
 *   componentDidLoad() {
 *     console.log(this.div.ref);
 *   }
 *
 *   render() {
 *     return <div ref={this.div.setRef} />;
 *   }
 * }
 */
export const useRef = <T extends HTMLElement = HTMLElement>({ nullRefs }: UseRefOptions = {}) => {
	const ref: {
		ref: T | undefined;
		setRef(el?: T): void;
	} = {
		ref: undefined,
		setRef: (el) => (ref.ref = nullRefs ? el : el ?? ref.ref),
	};

	return ref;
};

export interface UseRefOptions {
	/**
	 * If true, `null` refs will also be set. A ref is set to `null` if the element is removed during render. Enable this if you dynamically/conditionally add and remove the referenced element.
	 *
	 * When moving an element around, it will be removed from its old location as well as added to its new location, each calling the `ref` prop callback. Depending on the order of execution of those two ref calls (depending on which one is encountered first in the DOM), the `null` ref might be called last, therefore giving an undesired ref. For that reason this option is disabled by default.
	 */
	nullRefs?: boolean;
}

/**
 * Wait for a given amount of time.
 *
 * @param t time in ms
 *
 * @returns a promise that resolves after the given time
 */
export const wait = async (t: number) => new Promise<void>((resolve: () => void) => setTimeout(resolve, t));

/**
 * Debounce a function by the given delay.
 *
 * @param fn function to debounce
 * @param delay debounce time in ms
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
	let timer: any;

	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
};

/**
 * Throttle a function by the given delay.
 *
 * @param fn function to throttle
 * @param delay time in ms
 * @param skipFn optional function to execute when fn is skipped due to throttle
 */
export function throttle<T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => ReturnType<T> | void;
export function throttle<T extends (...args: any[]) => any, S extends (...args: Parameters<T>) => any>(
	fn: T,
	delay: number,
	skipFn: S,
): (...args: Parameters<T>) => ReturnType<T | S>;
export function throttle<T extends (...args: any[]) => any, S extends (...args: Parameters<T>) => any>(
	fn: T,
	delay: number,
	skipFn?: S,
): (...args: Parameters<T>) => ReturnType<T | S> | void {
	let lastCallTime: number | undefined;

	return (...args: Parameters<T>) => {
		if (lastCallTime && lastCallTime + delay > Date.now()) {
			return skipFn && skipFn(...args);
		}

		lastCallTime = Date.now();

		return fn(...args);
	};
}

/**
 * Get a random integer in the given range.
 */
export const getRandomInt = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;

/**
 * Get a data url from a base64 encoded image (assumes jpg by default).
 */
export const base64ImageToDataUrl = (base64String: string, type = 'jpg') => `data:image/${type};base64,${base64String}`;

/**
 * Get the value at the path of an object.
 *
 * @example
 * const foo = { bar: { value: 'foobar' } };
 * getByPath(foo, 'bar.value') // => 'foobar'
 * getByPath(foo, 'foo.bar') // => undefined
 */
export const getByPath = <T = any>(object: any, path: string): T =>
	path.split('.').reduce((nestedObject, key) => nestedObject && nestedObject[key], object);

/**
 * Make a deep clone of an object.
 */
export const clone = <T = any>(value: T): T =>
	!value || typeof value !== 'object'
		? value
		: Array.isArray(value)
		? value.map(clone)
		: Object.entries(value)
				.map(([key, val]) => ({ [key]: clone(val) }))
				.reduce((acc, val) => ({ ...acc, ...val }), {} as any);

/**
 * Download a file by opening it via a data url in a new window.
 *
 * @param data The file's data as a base64 encoded string.
 * @param mimeType The mime type also determines the file extension.
 * @param fileName Name of the file without extension.
 */
export const downloadFile = (data: string, mimeType: 'text/csv', fileName: string, addTimestamp = true) => {
	const fileExtensions = {
		'text/csv': '.csv',
	};

	const timestamp = new Date().toISOString().slice(0, 19).replace('T', '-').replace(/:/g, '');

	const fullName = [addTimestamp ? [fileName, timestamp].join('_') : fileName, fileExtensions[mimeType]].join('.');

	const link = document.createElement('a');

	link.href = `data:${mimeType};charset=utf-8,${data}`;
	link.target = '_blank';
	link.rel = 'noreferrer';
	link.download = fullName;

	link.click();
};

/**
 * Run a callback on the queried element within the parent. This uses `requestAnimationFrame` to make sure of the element's existence in the DOM.
 *
 * @example
 * raf({
 *   parent: this.el,
 *   selector: 'div.wrapper' as 'div',
 *   inShadowRoot: true,
 *   callback: div => {
 *     div.style.color = 'red';
 *   }
 * });
 */
export function raf<K extends keyof HTMLElementTagNameMap>(options: GenericRafOptions<K>): void;
export function raf(options: RafOptions): void;
export function raf<K extends keyof HTMLElementTagNameMap>(options: GenericRafOptions<K> & RafOptions): void {
	const { parent, inShadowRoot = false, selector, callback } = options;

	const fn = () => {
		if (!parent) {
			return;
		}

		const el = inShadowRoot ? parent.shadowRoot : parent;

		if (!el) {
			return requestAnimationFrame(fn);
		}

		const target = el.querySelector(selector);

		if (!target) {
			return requestAnimationFrame(fn);
		}

		callback(target);
	};

	requestAnimationFrame(fn);
}

interface RafOptions {
	/**
	 * The parent element to run the query on.
	 */
	parent: HTMLElement | undefined;

	/**
	 * Whether to query on the element or the element's shadow root. Defaults to `false`.
	 */
	inShadowRoot?: boolean;

	/**
	 * The selector to query for.
	 */
	selector: string;

	/**
	 * The callback to run on the element queried by the selector.
	 */
	callback(el: HTMLElement): void;
}

interface GenericRafOptions<K extends keyof HTMLElementTagNameMap> extends RafOptions {
	selector: K;
	callback(el: HTMLElementTagNameMap[K]): void;
}

/**
 * Handler to stop event propagation.
 */
export const stopPropagation = (e: Event) => e.stopPropagation();

/**
 * Read a file using a `FileReader` and return its data as a base64 encoded string.
 *
 * Using `readAsBinaryString` and converting it to base64 is faster than using `readAsDataURL` and removing the data url prefix. However, `readAsBinaryString` is not supported in IE :roll_eyes:, in which case it falls back to the latter.
 */
export const readFile = async (file: File, { asDataUrl = false }: ReadFileOptions = {}) =>
	new Promise<string>((resolve, reject) => {
		const fileReader = new FileReader();

		const readAsDataUrl = Boolean(asDataUrl) || !('readAsBinaryString' in fileReader);

		fileReader.addEventListener('error', () => reject(fileReader.error));
		fileReader.addEventListener('load', () => {
			const data = fileReader.result as string;
			const result = readAsDataUrl ? (asDataUrl === 'keep-prefix' ? data : removeDataUrlPrefix(data)) : btoa(data);

			resolve(result);
		});

		if (readAsDataUrl) {
			fileReader.readAsDataURL(file);
		} else {
			fileReader.readAsBinaryString(file);
		}
	});

interface ReadFileOptions {
	/**
	 * If set to `true`, it will read the file as a data url, and remove the data url prefix. If set to `keep-prefix`, it will return the data including the data url prefix. If set to `false`, the file will be read as a binary string and converted to base64.
	 */

	asDataUrl?: boolean | 'keep-prefix';
}

/**
 * Generate a v4 compliant uuid.
 */
export const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});

/**
 * Convert a data url to a blob.
 */
export const convertDataUrlToBlob = async (dataUrl: string) => fetch(dataUrl).then((res) => res.blob());
