# @sea-org/s-utils

> sea-nest 项目的实用类函数

## Install

```shell
$ yarn add @sea-org/s-utils
```

## Usage

```
import utils from '@sea-org/utils'

utils.valueFormat.getFormatter('number')(12345); // 12,345

```

## Documentation

如何使用请参考[Api](./docs/index.md)

## Contributing

如何贡献代码查看 [CONTRIBUTING](./CONTRIBUTING.md)

## FAQ

### 如何打包出符合 ES6 的 tree shaking 模式，供使用方按需加载?

1. 在 utils 下增加`.fatherrc.js`

   ```js
   export default {
     esm: 'babel',
     cjs: 'babel',
   };
   ```

2. 修改`package.json`

   ```json
   {
     "main": "lib/index.js",
     "module": "es/index.js",
     "types": "lib/index.d.ts"
   }
   ```

3. 在`utils/src/valueFormat.ts`修改为

   ```ts
   import * as numeral from 'numeral';

   ...
   ```
