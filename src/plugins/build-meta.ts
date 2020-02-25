// tslint:disable: no-octal-literal no-require-imports no-var-requires

import { Plugin } from 'rollup';

const pkg = require('../../package') as { version: string };

export const getBuildMeta = (): Plugin => {
	return {
		name: 'virtual-build-meta',
		resolveId: importee => {
			if (importee !== '@build-meta') {
				return null;
			}

			return '\0build-meta';
		},
		load: id => {
			if (id !== '\0build-meta') {
				return null;
			}

			return `export const appVersion = '${pkg.version}';`;
		},
	};
};

/*
 * This file also serves as a definition file for typescript, thus everything that is exported in the virtual build-meta module has to be exported here as well.
 */

export const appVersion = '0.0.0';
