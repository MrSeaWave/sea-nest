---
title: statistic
order: 2
nav:
  path: /components
  title: Components
group:
  title: Basic
  path: /basic
  order: 1
mobile: false
---

# @sea-org/s-statistic

指标卡，使用 web-component 技术

## 安装

```shell
$ yarn add @sea-org/s-statistic
```

## 基本用法

<code src="../demos/react-demo/App.jsx"></code>

## API

html 文件使用

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>&lt;s-statistic> Demo</title>
    <script type="module" src="url/to/@sea-org/s-statistic"></script>
  </head>
  <body>
    <div><h1>Demo</h1></div>
    <s-statistic></s-statistic>
  </body>
</html>
```

React 文件内使用，请先安装`@lit-labs/react`

```tsx | pure
import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import StatisticElement from '@sea-org/s-statistic';

const StatisticElementComponent = createComponent(React, 's-statistic', StatisticElement, {
  onTestSelect: 'onTestSelect',
})

...

<StatisticElementComponent {...options} />;
```

### 基本参数

| 参数          | 说明                           | 类型                            | 默认值       |
| :------------ | :----------------------------- | :------------------------------ | :----------- |
| style         | 外层容器样式                   | `CSSProperties`                 | -            |
| className     | 容器 className                 | `string`                        | -            |
| type          | 指标卡类型                     | `card-basic \| card-average`    | `card-basic` |
| spaceMode     | 空间模式（可滚动还是文字省略） | `scroll \| ellipsis`            | `scroll`     |
| verticalAlign | 垂直对齐方式                   | `'top' \| 'center' \| 'bottom'` | `center`     |
| params        | 数据配置参数                   | `BasicType`                     | `{}`         |
| dataSource    | 数据源                         | `DataSourceType[]`              | `[]`         |
| otherFunc     | 需要用到的函数定义             | `{onSelect:(params)=>void}`     | `-`          |

### BasicType

```ts
type BasicType = {
  // 是否开启选中功能
  selectable?: boolean;
  // 排列方式
  align?: 'left' | 'center' | 'right' | 'around' | 'between';
  flow?: 'row' | 'column';
  // 数值样式
  valueStyle?: StyleInfo;
  // 数值格式化方法
  formatters?: { [name: string]: FormatterType };
};
```

### FormatterType

```ts
type FormatterType =
  | {
      type?: NumeraTypeName;
      /**
       * 前缀
       */
      prefix?: string;
      /**
       * 后缀
       */
      suffix?: string;
      /**
       * 标签样式
       */
      labelStyle?: CSSProperties;
      /**
       * 数值样式
       */
      valueStyle?: CSSProperties;
    }
  | Function
  | NumeraTypeName;

type NumeraTypeName =
  | 'string'
  | 'integer'
  | 'number'
  | 'decimal'
  | 'percent'
  | 'percentSuffix'
  | 'abbr';
```

### DataSourceType

```ts
type DataSourceType = {
  name?: string;
  key?: string;
  value?: any;
};
```
