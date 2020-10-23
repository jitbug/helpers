/**
 * Call `toString()` on a value if it exists in its prototype, or return `''` otherwise.
 *
 * This assumes that anything implementing `.toString()` returns a string type.
 */
export const toStringOrEmptyString = (value: any) =>
	value === undefined || value === null || typeof value.toString !== 'function' ? '' : (value.toString() as string);

/**
 * Convert a string to title case.
 */
export const toTitleCase = (str: string) =>
	str
		.split(' ')
		.map((word) => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''))
		.join(' ');

/**
 * Convert a string from pascal to camel case.
 */
export const pascalToCamelCase = (str: string) =>
	str.length < 3 ? str.toLowerCase() : `${str[0].toLowerCase()}${str.substr(1)}`;

/**
 * Get the initials for each word in a string (capitalized).
 */
export const getInitials = (str: string) =>
	str
		.split(' ')
		.map((word) => (word ? word[0].toUpperCase() : ''))
		.join('');

/**
 * Convert a number to it's ordinal version.
 */
export const toOrdinal = (n: number) => {
	const mod10 = n % 10;
	const mod100 = n % 100;

	if (mod10 === 1 && mod100 !== 11) {
		return `${n}st`;
	}

	if (mod10 === 2 && mod100 !== 12) {
		return `${n}nd`;
	}

	if (mod10 === 3 && mod100 !== 13) {
		return `${n}rd`;
	}

	return `${n}th`;
};

/**
 * Filter falsy elements from an array, then join them. Default separator: `', '`.
 */
export const filterAndJoin = (parts: (string | false | null | undefined)[], separator = ', ') =>
	parts.filter(Boolean).join(separator);

/**
 * Remove the prefix of a base64 encoded data url (e. g. `data:image/jpeg;base64,`, `data:image/png;base64,`, `data:application/pdf;base64,`).
 */
export const removeDataUrlPrefix = (data: string) => {
	const match = data.substr(0, 50).match(/data:\S+\/\S+;base64,/);

	return match ? data.substr(match[0].length) : data;
};

/**
 * Convert a size description into its amount of bytes (inspired by the `ms` package).
 *
 * `KiB`, `MiB`, `GiB` are IEC standard, `kB`, `MB`, `GB` are SI standard.
 * @see https://en.wikipedia.org/wiki/Kilobyte
 */
export const bytes = (input: string) => {
	const match = input.trim().match(/([\d\.]+)\s*(\w*)/i);

	if (!match) {
		throw new Error('Invalid input.');
	}

	const size = Number(match[1]);
	const unit = match[2];

	switch (unit) {
		case 'bit':
		case 'bits':
			return size / 8;

		case 'B':
		case 'o':
		case 'byte':
		case 'bytes':
			return size;

		case 'kB':
			return size * 1000;

		case 'KiB':
			return size * 1024;

		case 'MB':
			return size * 1000 * 1000;

		case 'MiB':
			return size * 1024 * 1024;

		case 'GB':
			return size * 1000 * 1000 * 1000;

		case 'GiB':
			return size * 1024 * 1024 * 1024;

		default:
			throw new Error(`Invalid unit "${unit}".`);
	}
};

/**
 * Format a number of bytes into a human-readable format.
 *
 * @see https://github.com/sindresorhus/pretty-bytes
 */
export const formatBytes = (n: number) => {
	const byteUnits = ['B', 'kB', 'MB', 'GB'];

	if (!Number.isFinite(n)) {
		throw new Error('Number of bytes must be finite.');
	}

	if (n < 0) {
		throw new Error('Number of bytes must be positive.');
	}

	const exponent = Math.min(Math.floor(Math.log10(n) / 3), byteUnits.length - 1);

	const size = n / Math.pow(1000, exponent);
	const unit = byteUnits[exponent];

	return `${Number(size.toFixed(2))} ${unit}`;
};
