import { readdirSync } from 'fs';
import { join } from 'path';

// utils must build before core
// 各个包之间可能相互有依赖，因此需要指定构建的先后顺序，确保构建时依赖引用不会出错
const headPkgs = ['semantic-dom-diff', 'utils'];
const tailPkgs = readdirSync(join(__dirname, 'packages')).filter((pkg) => {
  console.log('pkg', pkg);
  return !headPkgs.includes(pkg) && pkg !== '.DS_Store';
});

console.log('headPkgs', headPkgs, tailPkgs);

export default {
  target: 'browser',
  esm: 'rollup',
  // esm: { type: 'rollup', mjs: true },
  cjs: 'rollup',
  runtimeHelpers: true,
  // disableTypeCheck: true,// 配置开启后 babel 模式下将不会生成 TypeScript 类型定义。
  pkgs: [...headPkgs, ...tailPkgs],
  extraBabelPlugins: [],
};
