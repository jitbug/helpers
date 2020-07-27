import nprogress from 'nprogress';
import { showProgress } from '.';

jest.mock('nprogress', () => ({
	start: jest.fn(() => {}),
	done: jest.fn(() => {}),
}));

describe('Ionic Helpers', () => {
	describe('showProgress()', () => {
		beforeEach(jest.clearAllMocks);

		it('should call nprogress.start()', () => {
			expect(nprogress.start).toBeCalledTimes(0);
			expect(nprogress.done).toBeCalledTimes(0);

			const progress = showProgress();

			expect(nprogress.start).toBeCalledTimes(1);
			expect(nprogress.done).toBeCalledTimes(0);

			progress.done();

			expect(nprogress.start).toBeCalledTimes(1);
			expect(nprogress.done).toBeCalledTimes(1);
		});

		it('should not call nprogress.done() when another progress has started in the meantime', async () => {
			const actionOne = new Promise((resolve) => {
				const progress = showProgress();
				setTimeout(() => {
					progress.done();
					resolve();
				}, 1000);
			});

			const actionTwo = new Promise((resolve) => {
				const progress = showProgress();
				setTimeout(() => {
					progress.done();
					resolve();
				}, 500);
			});

			await Promise.all([actionOne, actionTwo]);

			expect(nprogress.start).toBeCalledTimes(2);
			expect(nprogress.done).toBeCalledTimes(1);
		});
	});
});
