export * from './arrays';
export * from './dates';
export * from './fp';
export * from './strings';
export * from './time';
export * from './ui';
export * from './utils';

declare global {
	const moment: typeof import('moment-timezone');
}

export namespace global {}
