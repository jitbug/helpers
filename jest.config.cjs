module.exports = {
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup-file.cjs'],
	preset: 'ts-jest',
	testEnvironment: 'node',
};
