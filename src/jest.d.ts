/**
 * This extends the jest namespace to add custom matchers via namespace declaration merging.
 *
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 * @see https://github.com/kentcdodds/react-testing-library/issues/36#issuecomment-411434800
 */
declare namespace jest {
	interface Matchers<R, T> {
		toStartWith(value: string): CustomMatcherResult;
		toEndWith(value: string): CustomMatcherResult;
		toBeSameMoment(value: import('moment-timezone').Moment): CustomMatcherResult;
		toBeSameDay(value: import('moment-timezone').Moment): CustomMatcherResult;
	}
}
