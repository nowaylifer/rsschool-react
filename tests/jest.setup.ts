import '@testing-library/jest-dom';

jest.mock('../src/constants', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../src/constants'),
    API_URL: 'https://api.deezer.com',
  };
});

jest.mock('../src/hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));
