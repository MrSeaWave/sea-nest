# Contributing

## Development

```shell
$ git clone https://github.com/MrSeaWave/sea-nest.git
# npm is not allowed.
$ yarn
```

### Build

```shell
$ npm run build
```

### Open Docs

```shell
$ npm run docs:start
```

### Test

```shell
$ npm run test
```

### Release

```shell
$ npm run release
```

## Modify package

查看你需要修改的 package 所对应的 contributing (`packages/*/CONTRIBUTING.md`),

## Create new package

```shell
$ npm run create
```

## Pull Request Etiquette

- 必须严格按照 [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint) 格式提交代码

  ```
  feat： 新增feature
  fix: 修复bug
  docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
  style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  refactor: 代码重构，没有加新功能或者修复bug
  perf: 优化相关，比如提升性能、体验
  test: 测试用例，包括单元测试、集成测试等
  build: 构建系统或者包依赖更新
  ci: CI 配置，脚本文件等更新
  chore: 改变构建流程、或者增加依赖库、工具等
  revert: 回滚到上一个版本
  ```

- 请尽可能提供 demo 文件
- 请尽可能提供 test 文件
- 请可能补充文档,`packages/*/docs`

## docs

### 文档导航生成逻辑

[FrontMatter](https://d.umijs.org/zh-CN/config/frontmatter) && [自定义导航](https://d.umijs.org/zh-CN/guide/basic#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%BC%E8%88%AA%E3%80%81%E5%88%86%E7%BB%84%E5%92%8C%E6%A0%87%E9%A2%98)

推荐修改为：

```
---
title: {{projectName}} # 自定义页面名称
nav:
  path: /components # 自定义导航路由
  title: Components # 自定义导航名称
group:
  title: Basic # 自定义分组名称
  path: /basic # 自定义分组路由，注意，分组路由 = 导航路由 + 自己
---
```

修改完成后，重新 `npm run docs:start` 启动文档服务

### 如何切换 mobile、PC 的文档主题？

文档系统默认使用 mobile 主题，如果 demo 演示不适合呈现为 mobile 样式，可以在 markdown 文档的头部添加参数控制，关闭该文档的 mobile 主题，如下：

```md
---
mobile: false
---

Markdown 正文
```

在使用 mobile 主题时，占用右侧的空间较大，会挤压文档呈现面积，推荐添加 `toc: false` 关闭最右侧的锚点目录，如下；

```md
---
<!-- 关闭右侧的锚点目录，节约一点页面空间 -->
toc: false
---
```
