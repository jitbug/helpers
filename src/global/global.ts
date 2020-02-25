import { appVersion } from '@build-meta';
import { setupConfig } from '@ionic/core';
import '@ionic/pwa-elements'; // tslint:disable-line: no-import-side-effect
import { init as initSentry } from '@sentry/browser';

export default () => {
	initSentry({ dsn: 'https://5086ec2e516d411d8a0b60dc5a828c10@sentry.io/1529955', release: `pwa@${appVersion}` });

	/**
	 * Enforce material design on every platform.
	 */
	setupConfig({ mode: 'md' });
};
