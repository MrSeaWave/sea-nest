import {
  getDomHtml,
  getLightDomHtml,
  isEqualByDom,
  getDiffableHTML,
  isEqualByLightDom,
  isEqualByShadowDom,
  getShadowDomHtml,
} from '../src';

describe('dom', () => {
  it('can compare dom nodes', () => {
    const el = document.createElement('div');
    el.innerHTML = '<h1><!--test comment-->Hello World</h1>';
    const expectHtml = `
    <div>
      <h1>Hello World</h1>
    </div>
    `;
    const notExpectHtml = `
    <div>
      <h2>Hello World</h2>
    </div>
    `;
    // console.log('el', getDomHtml(el));
    // console.log('getDiffableHTML', getDiffableHTML(getDomHtml(el)));
    expect(isEqualByDom(el, expectHtml)).toBeTruthy();
    expect(isEqualByDom(el, notExpectHtml)).toBeFalsy();
  });

  it('passes along provided configuration', async () => {
    const el = document.createElement('div');
    el.setAttribute('foo', 'bar');
    const expectHtml = `<div></div>`;
    // console.log('get', getDomHtml(el));
    expect(isEqualByDom(el, expectHtml, { ignoreAttributes: ['foo'] })).toBeTruthy();
    expect(isEqualByDom(el, expectHtml)).toBeFalsy();
  });
});

describe('lightDom', () => {
  it('can compare lightDom nodes', async () => {
    const el = document.createElement('div');
    el.innerHTML = '<h1><!--test comment-->Hello World</h1>';
    const expectHtml = `
      <h1>Hello World</h1>
    `;
    const notExpectHtml = `
      <h2>Hello World</h2>
    `;
    // console.log('el', getLightDomHtml(el));
    // console.log('getDiffableHTML', getDiffableHTML(getLightDomHtml(el)));
    expect(isEqualByLightDom(el, expectHtml)).toBeTruthy();
    expect(isEqualByLightDom(el, notExpectHtml)).toBeFalsy();
  });

  it('passes along provided configuration', async () => {
    const el = document.createElement('div');
    el.innerHTML = '<h1 foo="bar">Hello World</h1>';
    const expectHtml = `<h1 foo="bar">Hello World</h1>`;
    // console.log('getLightDomHtml', getLightDomHtml(el));
    expect(isEqualByLightDom(el, expectHtml, { ignoreAttributes: ['foo'] })).toBeTruthy();
  });
});

describe('shadowDom', () => {
  const tag = 'tem-test-tag';

  class TagElement extends HTMLElement {
    constructor() {
      super();
      // 创建一个 shadow 节点，创建的其他元素应附着在该节点上
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<p>  shadow content</p> <!-- comment --> <slot></slot>';
    }
  }
  window.customElements.define(tag, TagElement);

  it('can compare shadow dom nodes', async () => {
    const el = document.createElement(tag);
    el.innerHTML = '<span>  light content  </span>';

    const expectHtml = `<${tag}><span>light content</span></${tag}>`;

    // console.log('el', getDomHtml(el));
    // console.log('getDiffableHTML', getDiffableHTML(getDomHtml(el)));

    expect(isEqualByDom(el, expectHtml)).toBeTruthy();

    const shadowExpectHtml = '<p>shadow content</p><slot>';
    const shadowNotExpectHtml = '<span>shadow content</span><slot>';

    // console.log('getShadowDomHtml', getShadowDomHtml(el));
    // console.log('getDiffableHTML', getDiffableHTML(getShadowDomHtml(el)));
    // console.log('shadowExpectHtml', getDiffableHTML(shadowExpectHtml));
    expect(isEqualByShadowDom(el, shadowExpectHtml)).toBeTruthy();
    expect(isEqualByShadowDom(el, shadowNotExpectHtml)).toBeFalsy();
  });
});
