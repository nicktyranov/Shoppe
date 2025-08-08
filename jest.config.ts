import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
   dir: './'
});

const customJestConfig: Config = {
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   testEnvironment: 'jest-environment-jsdom',
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1'
   }
};

export default createJestConfig(customJestConfig);
