import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { Plugin } from 'rollup';

export const resolveEnv = (): Plugin => {
	const { envName, gitBranch, buildIsDev } = getEnvMeta();

	return {
		name: 'resolve-@env',
		resolveId: importee => {
			if (importee !== '@env') {
				return null;
			}

			// 1. an env name is passed as environment variable (highest priority)
			if (envName) {
				if (!['dev', 'ci', 'testing', 'prod'].includes(envName)) {
					throw new Error(`Invalid ENV_NAME "${envName}" - should be "dev", "ci", "testing" or "prod".`);
				}

				return resolve(join('src', 'envs', `${envName}.ts`));
			}

			// 2. it's a dev build and custom env file exists
			if (buildIsDev && existsSync(resolve(join('src', 'envs', 'custom.ts')))) {
				return resolve(join('src', 'envs', 'custom.ts'));
			}

			// 3. master branch points to testing (prod copy)
			if (gitBranch === 'master') {
				return resolve(join('src', 'envs', 'testing.ts'));
			}

			// 4. prod branch points to prod
			if (gitBranch === 'prod') {
				return resolve(join('src', 'envs', 'prod.ts'));
			}

			// 5. default to dev otherwise
			return resolve(join('src', 'envs', 'dev.ts'));
		},
	};
};

export const getEnvMeta = () => {
	/**
	 * Custom env name set through environment variable.
	 */
	const envName = (process.env.ENV_NAME || '').toLowerCase();

	/**
	 * Git branch if Zeit Now for Github creates the deployment.
	 */
	const gitBranch = process.env.NOW_GITHUB_COMMIT_REF;

	/**
	 * Whether the flag is set to make a dev build.
	 */
	const buildIsDev = process.argv.includes('--dev');

	return { envName, gitBranch, buildIsDev };
};
