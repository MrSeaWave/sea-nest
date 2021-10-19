const esModules = [
  'lit',
  '@lit/reactive-element',
  'lodash-es',
  '@open-wc/testing-helpers',
  '@open-wc/scoped-elements',
  '@open-wc/dedupe-mixin',
  'testing-library__dom',
].join('|');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts'], // 指定要测试的文件类型的后缀
  testMatch: ['<rootDir>/**/*.test.[jt]s'],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
