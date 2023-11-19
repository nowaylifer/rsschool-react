import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  setupFiles: ['<rootDir>/tests/jest.polyfills.ts'],
  moduleNameMapper: {
    '\\.svg\\?react': '<rootDir>/tests/mocks/svg.ts',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
