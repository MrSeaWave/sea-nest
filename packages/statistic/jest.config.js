// eslint-disable-next-line @typescript-eslint/no-require-imports
import base from '../../jest.config.js';

console.log('use statistic jest.config.js');

export default { ...base, setupFilesAfterEnv: ['./jest.setup.js'] };
