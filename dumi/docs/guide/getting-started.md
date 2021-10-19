---
title: 快速上手
order: 2
nav:
  path: /guide
  title: Guide
---

## 安装

```shell
# Installation
yarn add @sea-org/sea-nest
# OR
npm i @sea-org/sea-nest
```

## 开始使用

现在就可以开始使用了。我们一起用 React 来使用指标卡。

```jsx | pure
import React, { useEffect, useRef } from 'react';
import { createComponent } from '@lit-labs/react';
import {StatisticElement} from '@sea-org/sea-nest';

const MyElementComponent = createComponent(React, 's-statistic', StatisticElement, {
  onTestSelect: 'onTestSelect',
});

function App() {
  return <div >
    <MyElementComponent/>
  </div>;
}

export default App;
```

这样就绘制好了！

![image](https://user-images.githubusercontent.com/21967852/137872775-4b2965a5-d253-49c0-9a0d-ef69032e0d04.png)

以上是组件库(`@sea-org/sea-nest`)的简单实用，更多组件请参考[component](/components)
