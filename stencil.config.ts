import { Config } from '@stencil/core';
import { stylus } from '@stencil/stylus';
import { getBuildMeta } from './src/plugins/build-meta';
import { getEnvMeta, resolveEnv } from './src/plugins/resolve-env';

const { gitBranch } = getEnvMeta();

/**
 * @see https://stenciljs.com/docs/config
 *
 * @todo use injectGlobalPaths (or maybe includePaths) for stylus in combination
 * with environment variables in order to apply variables for different themes
 * @see https://github.com/ionic-team/stencil-stylus#inject-globals-stylus-paths
 */
export const config: Config = {
	minifyJs: false,
	namespace: 'stencil-helpers',
	devMode: gitBranch ? !['master', 'prod'].includes(gitBranch) : undefined,
	plugins: [getBuildMeta(), resolveEnv(), stylus()],
	outputTargets: [
		{
			type: 'www',
			serviceWorker: { swSrc: 'src/sw.js', unregister: false },

			copy: [
				{
					src: 'assets/icon/favicon.ico',
					dest: 'favicon.ico',
				},
				/**
				 * Copy Moment.js into the output target so it can be referenced as a
				 * script from `index.html` rather than being bundled along with the
				 * app. This is because it would load all the data and be bloated when
				 * used as a node module.
				 */
				{
					src: '../node_modules/moment/min/moment.min.js',
					dest: 'lib/moment.min.js',
				},
				{
					src: '../node_modules/moment/locale/en-nz.js',
					dest: 'lib/moment-locales/en-nz.js',
				},
				{
					src: '../node_modules/moment-timezone/builds/moment-timezone-with-data-10-year-range.js',
					dest: 'lib/moment-timezone-with-data-10-year-range.js',
				},
			],
		},
	],
	globalScript: 'src/global/global.ts',
	globalStyle: 'src/global/global.styl',
	testing: {
		roots: ['<rootDir>/__mocks__', '<rootDir>/src'],
		setupFilesAfterEnv: ['<rootDir>/jest-setup-file.js'],
	},
};
