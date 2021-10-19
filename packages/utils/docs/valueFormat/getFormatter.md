---
title: getFormatter
order: 3
nav:
  title: Utils
  path: /utils
group:
  title: valueFormat
  path: /value-format
  order: 3
---

# getFormatter

获取 format 方法

## 基本用法

```js
import { valueFormat } from '@sea-org/s-utils';
const formatFunc = valueFormat.getFormatter('number');
const val = formatFunc(12345);
```

## API

```ts
getFormatter: (format?: string) =>
  (
    value: string | number,
    {
      place,
    }?: {
      place?: number | undefined;
    }
  ) =>
    string;
```

### 基本参数

| 参数   | 说明        | 类型             | 必填 | 默认值   |
| :----- | :---------- | :--------------- | :--- | :------- |
| format | format 类型 | `NumeraTypeName` | 否   | "string" |

### NumeraTypeName

```ts
type NumeraTypeName =
  | 'string'
  | 'integer'
  | 'number'
  | 'decimal'
  | 'percent'
  | 'percentSuffix'
  | 'abbr';
```

## 返回值

format 方法
