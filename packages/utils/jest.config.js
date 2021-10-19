// eslint-disable-next-line @typescript-eslint/no-require-imports
const base = require('../../jest.config.js');

console.log('use utils jest.config.js');

module.exports = {
  ...base,
  // moduleNameMapper: {
  //   '^lodash-es$': 'lodash',
  // }
};
