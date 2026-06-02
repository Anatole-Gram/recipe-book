import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Обрабатывает стили и макеты файлов (необязательно, но рекомендуется)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};

export default config;