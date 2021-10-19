---
title: semantic-dom-diff
nav:
  path: /components
  title: Components
group:
  title: Basic
  path: /basic
---

# @sea-org/semantic-dom-diff

semantic-dom-diff allows diffing chunks of dom or HTML for semantic equality:

- whitespace and newlines are normalized
- tags and attributes are printed on individual lines
- comments are removed
- style, script and SVG contents are removed
- tags, attributes or element's light dom can be ignored through configuration

## 安装

```shell
$ yarn add @sea-org/semantic-dom-diff
```

## 基本用法

### Dom Info

```js
import { getDomHtml, getLightDomHtml, getShadowDomHtml } from '@sea-org/semantic-dom-diff';

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<p> shadow content </p>';
  }
}

customElements.define('my-element', MyElement);

const el = document.createElement('my-element');
el.innerHTML = '<div> light dom content </div>';

getDomHtml(el); // <my-element><div> light dom content </div></my-element>
getLightDomHtml(el); // <div> light dom content </div>
getShadowDomHtml(el); // <p> shadow content </p>
```

### Manual diffing

The dom is diffed semantically: whitespace, newlines, etc. are normalized.

```js
import { isEqualByDom, isEqualByLightDom, isEqualByShadowDom } from '@sea-org/semantic-dom-diff';

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<p> shadow content </p>';
  }
}

customElements.define('my-element', MyElement);

const el = document.createElement('my-element');
el.innerHTML = '<div> light dom content </div>';

const options = {};
isEqualByDom(el, '<my-element><div> light dom content </div></my-element>', options); // true
isEqualByLightDom(el, '<div> light dom content </div>', options); // true
isEqualByShadowDom(el, '<p> shadow content </p>', options); // true
```

#### Ignoring tags and attributes

```js
import { isEqualByDom } from '@sea-org/semantic-dom-diff';

it('renders correctly', async () => {
  const el = document.createElement('div');
  el.setAttribute('my-random-attribute', String(Math.random()));
  el.innerHTML = '<p>Hello World</p>';

  const expectHtml = `
  <div>
    <p>Hello World</p>
  </div>
`;
  expect(
    isEqualByDom(el, expectHtml, {
      ignoreAttributes: ['my-random-attribute'],
    })
  ).toBeTruthy();
});
```

#### Ignoring an attribute only for certain tags

```js
import { isEqualByDom } from '@sea-org/semantic-dom-diff';

it('renders correctly', async () => {
  const el = document.createElement('div');
  el.setAttribute('id', 'testID');
  el.innerHTML = `<input id=${Math.random()}>`;
  const expectHtml = `
  <div id="testID">
    <input>
  </div>
  `;

  expect(
    isEqualByDom(el, expectHtml, {
      ignoreAttributes: [{ tags: ['input'], attributes: ['id'] }],
    })
  ).toBeTruthy();
});
```

#### Ignoring tags

```js
import { isEqualByDom } from '@sea-org/semantic-dom-diff';

it('renders correctly', async () => {
  const el = document.createElement('div');
  el.innerHTML = '<my-custom-element>My Element</my-custom-element>Hello World';

  const expectHtml = `
  <div>
    Hello World
  </div>
`;
  expect(
    isEqualByDom(el, expectHtml, {
      ignoreTags: ['my-custom-element'],
    })
  ).toBeTruthy();
});
```

#### Ignoring children

```js
import { isEqualByDom } from '@sea-org/semantic-dom-diff';

it('renders correctly', async () => {
  const el = document.createElement('div');
  el.innerHTML = `
   <my-custom-input id="myInput">
        <input id="inputRenderedInLightDom">
        Some text rendered in the light dom
   </my-custom-input>
   foo
  `;

  const expectHtml = `
    <div>
      <my-custom-input id="myInput"></my-custom-input>
      foo
    </div>
`;
  expect(
    isEqualByDom(el, expectHtml, {
      ignoreChildren: ['my-custom-input'],
    })
  ).toBeTruthy();
});
```

## API

```js | pure
import {
  getDomHtml,
  getLightDomHtml,
  getShadowDomHtml,
  getDiffableHTML,
  isEqualByDom,
  isEqualByLightDom,
  isEqualByShadowDom,
} from '@sea-org/semantic-dom-diff';
```

### 基本参数

#### getDomHtml(el)

| 参数 | 说明    | 类型      | 默认值 |
| :--- | :------ | :-------- | :----- |
| el   | Element | `Element` | -      |

返回值：语义化 html 信息

#### getLightDomHtml(el)

| 参数 | 说明    | 类型      | 默认值 |
| :--- | :------ | :-------- | :----- |
| el   | Element | `Element` | -      |

返回值：语义化 html 信息

#### getShadowDomHtml(el)

| 参数 | 说明    | 类型      | 默认值 |
| :--- | :------ | :-------- | :----- |
| el   | Element | `Element` | -      |

返回值：语义化 html 信息

#### getDiffableHTML(html,options)

| 参数    | 说明        | 类型             | 默认值 |
| :------ | :---------- | :--------------- | :----- |
| html    | 语义化 html | `string \| Node` | -      |
| options | DiffOptions | `DiffOptions`    | -      |

返回值： 语义化 html 信息

```ts
export type IgnoreAttributesForTags = {
  /**
   * tags on which to ignore the given attributes
   */
  tags: string[];
  /**
   * attributes to ignore for the given tags
   */
  attributes: string[];
};
export type DiffOptions = {
  /**
   * array of attributes to ignore, when given a string that attribute will be ignored on all tags
   * when given an object of type `IgnoreAttributesForTags`, you can specify on which tags to ignore which attributes
   */
  ignoreAttributes?: (string | IgnoreAttributesForTags)[];
  /**
   * array of tags to ignore, these tags are stripped from the output
   */
  ignoreTags?: string[];
  /**
   * array of tags whose children to ignore, the children of
   * these tags are stripped from the output
   */
  ignoreChildren?: string[];
  /**
   * array of attributes which should be removed when empty.
   * Be careful not to add any boolean attributes here (e.g. `hidden`) unless you know what you're doing
   */
  stripEmptyAttributes?: string[];
};
```

#### isEqualByDom(el,html,options)

| 参数    | 说明    | 类型          | 默认值 |
| :------ | :------ | :------------ | :----- |
| el      | Element | `Element`     | -      |
| html    | html    | `string`      | -      |
| options | options | `DiffOptions` | -      |

返回值：Boolean

#### isEqualByLightDom(el,html,options)

| 参数    | 说明    | 类型          | 默认值 |
| :------ | :------ | :------------ | :----- |
| el      | Element | `Element`     | -      |
| html    | html    | `string`      | -      |
| options | options | `DiffOptions` | -      |

返回值：Boolean

#### isEqualByShadowDom(el,html,options)

| 参数    | 说明    | 类型          | 默认值 |
| :------ | :------ | :------------ | :----- |
| el      | Element | `Element`     | -      |
| html    | html    | `string`      | -      |
| options | options | `DiffOptions` | -      |

返回值：Boolean
