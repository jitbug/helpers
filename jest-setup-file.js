/**
 * This file is referenced in `stencil.config.ts` as a testing setup file for
 * Jest. It runs once per test file immediately before executing the test.
 *
 * @see https://medium.com/@justintulk/how-to-mock-an-external-library-in-jest-140ac7b210c2
 * @see https://jestjs.io/docs/en/configuration.html#setupfiles-array
 */

/**
 * URLSearchParams is not globally available in Node verions less than v10.
 *
 * @todo remove once everything runs on node 10
 */
if (!('URLSearchParams' in global)) {
	const { URLSearchParams } = require('url');
	global.URLSearchParams = URLSearchParams;
}

/**
 * Globally provide momentjs.
 */
const moment = require('moment-timezone');
global.moment = moment;
global.moment.tz.setDefault('Pacific/Auckland');

/**
 * Add Custom matchers.
 */
expect.extend({
	/**
	 * @param {string} actualString
	 * @param {string} expectedString
	 */
	toStartWith: (actualString, expectedEnding) => ({
		message: () => `expected that ${actualString} starts with ${expectedEnding}`,
		pass: actualString.startsWith(expectedEnding),
	}),
	/**
	 * @param {string} actualString
	 * @param {string} expectedString
	 */
	toEndWith: (actualString, expectedEnding) => ({
		message: () => `expected that ${actualString} ends with ${expectedEnding}`,
		pass: actualString.endsWith(expectedEnding),
	}),

	/**
	 * @param {moment.Moment} actualMoment
	 * @param {moment.Moment} expectedMoment
	 */
	toBeSameMoment: (actualMoment, expectedMoment) => ({
		message: () => `expected that ${actualMoment.format()} is the same as ${expectedMoment.format()}`,
		pass: actualMoment.isSame(expectedMoment),
	}),

	/**
	 * @param {moment.Moment} actualMoment
	 * @param {moment.Moment} expectedMoment
	 */
	toBeSameDay: (actualMoment, expectedMoment) => ({
		message: () => `expected that ${actualMoment.format('ll')} is the same day as ${expectedMoment.format('ll')}`,
		pass: actualMoment.isSame(expectedMoment, 'day'),
	}),
});
