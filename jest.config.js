module.exports = {
  roots: [ '<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup-file.js'],
	preset: 'ts-jest',
  testEnvironment: 'node',
}
