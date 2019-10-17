module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/registerServiceWorker.ts',
    '!<rootDir>/node_modules/',
    '!src/test-helpers/**/*',
    '!src/typings/*',
  ],
  globals: {
    window: {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: {},
      location: {
        origin: '',
        href: '',
      },
    },
  },
}
