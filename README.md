# sea-nest

## Setting up the sea-nest monorepo for development

Initialize repo:

```bash
$ yarn
```

Build all packages:

```bash
$ npm run build
```

Test all packages:

```shell
$ npm run test
```

Or Run Doc

```shell
# 如果是第一次 必须先build才可以 docs:start
$ npm run build

$ npm run docs:start
```

## 如何安装依赖

主项目添加依赖

```bash
$ yarn add [packageName] -W -D
```

删除公共依赖

```bash
$ yarn remove -W -D [packageName]
```

给所有子项目增删依赖

```bash
$ yarn workspaces run add [packageName]
$ yarn workspaces run remove [packageName]
```

给某个项目增删依赖

```bash
$ yarn workspace [packageNameA] add [packageNameB@version] # packageNameA是指定安装依赖的包名，packageNameB是公共的包名或者项目内的包名
$ yarn workspace [packageNameA] remove [packageNameB]
```

## 如何创建子应用

```bash
$ npm run create
```

默认使用根目录的`tsconfig.json`,如果想为每个包分别定制设置，那么可以创建一个该 `package` 的`tsconfig.json`，否则根目录的`tsconfig.json`就会起作用。

```json
// 各package的tsconfig.json
{
  "extends": "../../tsconfig.json",

  "compilerOptions": {
    "outDir": "./lib"
  },

  "include": ["src/**/*"]
}
```

## 构建

```bash
$ npm run build
```

## 发布

```shell
$ npm run release
```

## Contributing

如何贡献代码查看 [CONTRIBUTING](./CONTRIBUTING.md)

## dependencies

- [lerna](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/)：多包管理
- [father-build](https://github.com/umijs/father)：用于构建 packages
  - 支持 lerna 结构，根目录配置 `.fatherrc.js`，即可运行编译所有 `packages`
  - `package` 目录配置的 `.fatherrc.js` 会继承根目录的 `.fatherrc.js`，因此，可以在单个 `package` 下新建 `.fatherrc.js` 去添加独有的配置
