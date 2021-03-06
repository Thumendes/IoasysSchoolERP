import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  rootDir: "./",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "node",
  globalSetup: "<rootDir>/tests/jestGlobalSetup.ts",
  moduleNameMapper: {
    "^prisma/(.*)$": "<rootDir>/prisma/$1",
    "^modules/(.*)$": "<rootDir>/src/modules/$1",
    "^server/(.*)$": "<rootDir>/src/server/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
    "^config/(.*)$": "<rootDir>/src/config/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
  },
};

export default config;
