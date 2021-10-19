# Contributing

## Development

```shell
$ git clone https://github.com/MrSeaWave/sea-nest.git
$ cd sea-nest/packages/statistic
# npm is not allowed.
$ yarn
```

### 调试

#### Build

以监听模式启动编译(可选)。

```shell

$ npm run build:watch

```

#### Server

之后在另一个命令行窗口启动服务。

使用 esbuild 的方式，直接启动服务，无需再次编译

```shell
$ npm run start
```

打开 http://localhost:8000/demos/basic/index.html 即可看到`网页

## Pull Request Etiquette

- 必须严格按照 [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint) 格式提交代码
- 请尽可能提供 [demo](./demos) 文件
- 请尽可能提供 [test](./__tests__) 文件
- 请可能补充文档，[如何去使用](./docs)
