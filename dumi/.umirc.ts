import { defineConfig } from 'dumi';
// @ts-ignore
import { getHostPkgDocs } from './utils';

const pkgDocs = getHostPkgDocs();
// @ts-ignore
const BUILD_ENV = process.env.BUILD_ENV || 'dev';
const publicPath = BUILD_ENV === 'dev' ? '/' : '/sea-nest/';

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'sea-nest',
  mode: 'site',
  base:publicPath,
  publicPath: publicPath,
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  devServer: {
    port: 3000,
  },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    { title: '问题反馈', path: 'https://github.com/MrSeaWave/sea-nest/issues' },
    {
      title: 'GitHub',
      path: 'https://github.com/MrSeaWave/sea-nest',
    },
  ],
  resolve: {
    includes: ['docs', ...pkgDocs],
  },
});
