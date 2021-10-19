# @sea-org/s-hello-world


基于`web-component`创建的自定义 html 标签


基于`web-component` 使用谷歌出品开源库的`lit-element`（可支持复杂的数据传递）

- 令人愉快的声明

`lit-element`简单，熟悉的开发模型使构建 web 组件变得前所未有的简单。

以声明的方式表达 UI，作为状态的函数。 不用学习 web-components 语言，可以在模版中使用 javascript 的全部功能。element 元素更改时会自动更新

- 快而轻

无论是在哪里工作的人，都会欣赏 Lit-element 的速度非常快。它使用 lit-html 定义和呈现 html 只会重新刷新组件样式动态变更部分

- 无缝互操作

Lit-element 遵循 web 组件标准。因此组件将适用于任何框架。Lit-element 使用自定义元素轻松包含在网页中。使用 shadow DOM 进行封装。

> 如何使用 lit:参考[面向 React 开发者的 Lit](https://codelabs.developers.google.com/codelabs/lit-2-for-react-devs?hl=zh-cn#0s)


## 调试流程

以监听模式启动编译。

```shell
$ npm run build:watch
```

之后在另一个命令行窗口启动服务。

```shell
打开examples/index.html即可
```

注意：监听到代码发生变化后只会编译，但不会刷新浏览器，需要手动刷新。
