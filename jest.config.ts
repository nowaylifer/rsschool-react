const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  setupFiles: ['<rootDir>/tests/jest.polyfills.ts'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/tests/mocks/svg.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
