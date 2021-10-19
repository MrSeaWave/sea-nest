/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { execSync } = require('child_process');

// 获取packages下的所有pkg path
function getHostPkgAlias() {
  const pkgs: any[] = [];

  JSON.parse(
    execSync(`lerna ls --json --all`, {
      stdio: 'pipe',
      // fix: 修复windows环境下有多余输出导致JSON.parse报错的问题
    }).toString()
    // .replace(/([\r\n]\])[^]*$/, '$1')
  ).forEach((pkg: any) => {
    pkgs.push([pkg.name, pkg.location]);
  });

  return pkgs;
}

// 获取每个pkg下的docs
function getHostPkgDocs() {
  const hostPkgAlias = getHostPkgAlias();
  return hostPkgAlias.map(([name, pkgPath]) => {
    return path.join(pkgPath, 'docs');
  });
}

// 获取dumi docs目录
function getDumiDocs() {
  return path.join(__dirname, './docs');
}

module.exports = { getHostPkgAlias, getHostPkgDocs, getDumiDocs };
