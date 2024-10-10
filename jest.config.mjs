// jest.config.mjs
// import { defaults } from 'ts-jest/presets';

export default {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup-file.mjs'],
  preset: 'ts-jest/presets/default-esm', // Ensure you're using the ESM preset for TypeScript
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ESM
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
  },
};
