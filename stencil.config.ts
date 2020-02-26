import { Config } from '@stencil/core';

/**
 * @see https://stenciljs.com/docs/config
 *
 */
export const config: Config = {
	minifyJs: false,
	namespace: 'stencil-helpers',
	outputTargets: [
		{
			type: 'www',

			copy: [
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
	testing: {
		roots: ['<rootDir>/src'],
		setupFilesAfterEnv: ['<rootDir>/jest-setup-file.js'],
	},
};
