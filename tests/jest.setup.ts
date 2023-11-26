import '@testing-library/jest-dom';

jest.mock('../src/lib/constants', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../src/lib/constants'),
    API_URL: 'https://api.deezer.com',
  };
});

jest.mock('../src/lib/hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
