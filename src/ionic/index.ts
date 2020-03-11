import {
	actionSheetController,
	ActionSheetOptions,
	alertController,
	AlertOptions,
	loadingController,
	LoadingOptions,
	modalController,
	ModalOptions,
	popoverController,
	PopoverOptions,
	toastController,
	ToastOptions,
} from '@ionic/core';
import { JSX } from '@stencil/core';
import nprogress from 'nprogress';
import { wait } from '../utils';

/**
 * Show an action sheet.
 */
export const showActionSheet = async (options: ActionSheetOptions) => {
	const actionSheet = await actionSheetController.create(options);

	actionSheet.present();

	return actionSheet;
};

/**
 * Show an alert.
 */
export const showAlert = async (message?: string, options?: AlertOptions) => {
	const alert = await alertController.create({ message, header: 'Error', buttons: ['Dismiss'], ...options });

	alert.present();

	return alert;
};

/**
 * Show a loading popover.
 */
export const showLoading = async (options: LoadingOptions = {}) => {
	const loading = await loadingController.create(options);

	loading.present();

	return loading;
};

/**
 * Show a loading popover while awaiting a promise.
 */
export const showLoadingWhile = async <T>(promise: Promise<T>) => {
	const [result, loading] = await Promise.all([promise, showLoading()]);
	loading.dismiss();

	return result;
};

/**
 * Show a modal.
 *
 * Has to be a function because otherwise `keyof JSX.IntrinsicElements` gets expanded into a union type of string literals.
 * @see https://github.com/microsoft/TypeScript/issues/27171#issuecomment-533148919
 */
export async function showModal<T extends keyof JSX.IntrinsicElements>(options: TypedModalOptions<T>) {
	const modal = await modalController.create(options);

	modal.present();

	return modal;
}

interface TypedModalOptions<T extends keyof JSX.IntrinsicElements> extends Omit<ModalOptions, 'component'> {
	component: T;
	componentProps?: JSX.IntrinsicElements[T];
}

/**
 * Show a toast.
 */
export const showToast = async (message?: string, options: ToastOptions = {}) => {
	// dismiss all existing toasts
	document.querySelectorAll('ion-toast').forEach(existingToast => existingToast.dismiss());

	options.buttons = [...(options.buttons || []), { icon: 'close' }];

	const toast = await toastController.create({
		duration: 7000,
		position: 'bottom',
		color: 'success',
		message,
		...options,
	});

	toast.present();

	return toast;
};

/**
 * Show a popover.
 */
export const showPopover = async (options: PopoverOptions) => {
	const popover = await popoverController.create(options);

	popover.present();

	return popover;
};

/**
 * Show a progress bar at the top of the page (nprogress).
 */
export const showProgress = () => {
	nprogress.start();

	return nprogress;
};

/**
 * Show a progress bar while awaiting a promise.
 */
export const showProgressWhile = async <T>(promise: Promise<T>) => {
	const progress = showProgress();
	const result = await promise;
	progress.done();

	return result;
};

/**
 * Shows a confirmation alert that returns a promise which will resolve to `true` if the user presses "Yes" and `false` if the user presses "No". The message should be a question.
 */
export const showConfirmationAlert = async (question?: string, options?: AlertOptions) => {
	return new Promise<boolean>(async resolve => {
		await showAlert(question, {
			header: 'Please confirm',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => resolve(false),
				},
				{
					text: 'Yes',
					handler: () => resolve(true),
				},
			],
			...options,
		});
	});
};

/**
 * Check whether the viewport is at least of specified size.
 *
 * The size breakpoints match the ones from Ionic (except 'xs' cause `0` is useless):
 *
 * | size   | pixels  | description      |
 * |--------|---------|------------------|
 * | `'xs'` | 375 px  | large phone      |
 * | `'sm'` | 576 px  | phablet          |
 * | `'md'` | 768 px  | tablet portrait  |
 * | `'lg'` | 992 px  | tablet landscape |
 * | `'xl'` | 1200 px | desktop          |
 *
 * @see https://ionicframework.com/docs/layout/grid#default-breakpoints
 */
export const viewportIsMin = (size: keyof typeof breakpoints) =>
	matchMedia(`(min-width: ${breakpoints[size]}px`).matches;

const breakpoints = {
	xs: 375,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
};

/**
 * Go to a route.
 */
export const goToRoute: typeof HTMLIonRouterElement.prototype.push = async (...args) => {
	let router: HTMLIonRouterElement | null = null;

	while (!router) {
		router = document.querySelector('ion-router');
		await wait(10);
	}

	return router.push(...args);
};

/**
 * Change the hash of the current route without adding a new state to the browser history.
 */
export const changeRouteHash = (hash: string) => history.replaceState(undefined, '', `#${hash}`);
