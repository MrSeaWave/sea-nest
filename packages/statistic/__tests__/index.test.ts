import userEvent from '@testing-library/user-event';
// DOM Testing Library + Shadow DOM
import { screen } from 'testing-library__dom';

import StatisticElement from '../src';

//   如果使用 "@open-wc/testing-helpers": "^2.0.0-next.0"，jsdom会报错
// Cannot read property '_customElementDefinitions' of undefined
import { fixture, html } from '@open-wc/testing-helpers';
import {
  getDiffableHTML,
  getDomHtml,
  getShadowDomHtml,
  isEqualByShadowDom,
} from '@sea-org/semantic-dom-diff';

// eslint-disable-next-line no-promise-executor-return
const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const basicData = {
  type: 'card-basic',
  verticalAlign: 'center',
  style: {},
  className: '',
  params: {
    selectable: true,
    flow: 'row',
    align: 'left',
    valueStyle: {},
    formatters: {
      value: {
        type: 'number',
        prefix: '',
        suffix: '人',
        labelStyle: {},
        valueStyle: {},
      },
      value1: {
        type: 'percent',
        suffix: '↑',
        valueStyle: {
          color: '#ff5676',
        },
      },
      value2: {
        type: 'percent',
        suffix: '↓',
        valueStyle: {
          color: '#45cab5',
        },
      },
    },
  },
  dataSource: [
    {
      name: '',
      key: 'value',
      value: 456789,
    },
    {
      name: '同比',
      key: 'value1',
      value: 0.2,
    },
    {
      name: '环比',
      key: 'value2',
      value: -0.7,
    },
  ],
  otherFunc: {
    // 配合selectable使用
    onSelect: (params: any) => {
      console.log('basic params', params);
    },
  },
};

describe('statistic', () => {
  const CUSTOM_TAG = 's-statistic';
  const CUSTOM_ID = 'custom-id';
  let customElement: any;

  const getShadowRoot = (tagName: string): ShadowRoot => {
    console.log('tageName', tagName);
    // @ts-ignore
    return document.body.getElementsByTagName(tagName)[0].shadowRoot;
  };

  beforeEach(() => {
    // customElement = window.document.createElement(CUSTOM_TAG) as any;
    // document.body.appendChild(customElement);
  });

  afterEach(() => {
    // document.body.getElementsByTagName(CUSTOM_TAG)[0].remove();
  });

  it('is defined', () => {
    const el = document.createElement(CUSTOM_TAG);
    // expect(el instanceof StatisticElement).toBeTruthy()
    expect(el).toBeInstanceOf(StatisticElement);
  });

  it('empty-tips display', async () => {
    const el = document.createElement(CUSTOM_TAG) as StatisticElement;
    document.body.appendChild(el);
    await el.updateComplete;
    const expectedHTML = '<empty-tips></empty-tips>';
    expect(isEqualByShadowDom(el, expectedHTML)).toBeTruthy();
  });

  it('card-basic dom display && click', async () => {
    const onSelect = jest.fn();

    const el = document.createElement(CUSTOM_TAG) as any;
    el.setAttribute('type', basicData.type);
    el.setAttribute('vertical-align', basicData.verticalAlign);
    el.params = basicData.params;
    el.dataSource = basicData.dataSource;
    el.otherFunc = {
      onSelect: (p: any) => {
        console.log('value', p);
        onSelect();
      },
    };

    document.body.appendChild(el);

    await el.updateComplete;

    const expectedHTML = `
    <div class="align-row-left card-group card-main">
      <card-item type="first">
      </card-item>
    </div>
    <div class="align-row-left card-group card-sec">
      <card-item type="other">
      </card-item>
      <card-item type="other">
      </card-item>
    </div>
    `;

    expect(isEqualByShadowDom(el, expectedHTML)).toBeTruthy();

    const bel = screen.getByText('同比');
    await userEvent.click(bel);
    expect(onSelect).toBeCalled();
  });

  it('change empty to card-basic data', async () => {
    const el = document.createElement(CUSTOM_TAG) as StatisticElement;

    document.body.appendChild(el);

    await el.updateComplete;

    const nowEl = document.querySelector(CUSTOM_TAG) as any;

    const emptyHTML = '<empty-tips></empty-tips>';

    expect(isEqualByShadowDom(nowEl, emptyHTML)).toBeTruthy();

    await sleep(1000);

    nowEl.setAttribute('type', basicData.type);
    nowEl.setAttribute('vertical-align', basicData.verticalAlign);
    nowEl.params = basicData.params;
    nowEl.dataSource = basicData.dataSource;

    // 因为是在jest中，所以需要手动调用更新lit的组件，否则shadowDom不变
    nowEl.requestUpdate();

    await nowEl.updateComplete;

    const expectedHTML = `
    <div class="align-row-left card-group card-main">
      <card-item type="first">
      </card-item>
    </div>
    <div class="align-row-left card-group card-sec">
      <card-item type="other">
      </card-item>
      <card-item type="other">
      </card-item>
    </div>
    `;

    expect(isEqualByShadowDom(nowEl, expectedHTML)).toBeTruthy();
  });

  // it('card-basic display', async () => {
  //   const el = (await fixture(html`<s-statistic
  //     type=${basicData.type}
  //     vertical-align=${basicData.verticalAlign}
  //     .params=${basicData.params}
  //     .dataSource=${basicData.dataSource}
  //     .otherFunc=${basicData.otherFunc}
  //   ></s-statistic>`)) as any;
  //
  //   // el.setAttribute('type', basicData.type);
  //   // el.setAttribute('vertical-align', basicData.verticalAlign);
  //   // el.params=basicData.params
  //   // el.dataSource=basicData.dataSource
  //   // el.otherFunc=basicData.otherFunc
  //   // customElement.setAttribute('params', basicData.params);
  //   // customElement.setAttribute('dataSource', basicData.dataSource);
  //   // customElement.setAttribute('otherFunc', basicData.otherFunc);
  //   console.log('el', el);
  //   // console.log('customElement.updateComplete', el.updateComplete);
  //   // await el.updateComplete;
  //
  //   console.log('dom', getDomHtml(el));
  //   console.log('shadowDom', getShadowDomHtml(el));
  //   console.log('shadowDom', getDiffableHTML(getShadowDomHtml(el)));
  //   const expectedHTML = `
  //   <div class="align-row-left card-group card-main">
  //     <card-item type="first">
  //     </card-item>
  //   </div>
  //   <div class="align-row-left card-group card-sec">
  //     <card-item type="other">
  //     </card-item>
  //     <card-item type="other">
  //     </card-item>
  //   </div>
  //   `;
  //   expect(isEqualByShadowDom(el, expectedHTML)).toBeTruthy();
  // });

  it('should run an empty test', () => {
    expect(true).toBeTruthy();
  });
});
