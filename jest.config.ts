import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: {
    '\\.svg\\?react': '<rootDir>/tests/__mocks__/svg.ts',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
