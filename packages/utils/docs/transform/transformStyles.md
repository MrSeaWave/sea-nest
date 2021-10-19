---
title: transformStyles
nav:
  title: Utils
  path: /utils
group:
  title: transformData
  path: /transform
---

# transformStyles

仿写 react 中的 style 转换方式，自动补充`px`，支持`{ fontSize:12 }`格式输出为`{ fontSize:12px }`

## 基本用法

```js
import { transformData } from '@sea-org/s-utils';
const { transformStyles } = transformData;
transformStyles(style);
```

## API

```ts
type Style = {
  [key: string]: any;
};

function transformStyles(styles: Style): Style;
```

### 基本参数

| 参数   | 说明 | 类型    | 必填 | 默认值 |
| :----- | :--- | :------ | :--- | :----- |
| styles | 样式 | `Style` | 否   | -      |

## 返回值

转换后的数据
