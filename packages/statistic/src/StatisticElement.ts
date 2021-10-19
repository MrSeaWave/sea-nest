import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './EmptyTipsElement';
import './ItemElement';
import { cardFlexStyle, cardStyle, hostStyle } from './styles';
import {
  CardAverageType,
  CardBasicType,
  DataSourceType,
  SpaceModeType,
  StatisticType,
  VerticalAlignType,
} from './interfaces';

// Registers the element
@customElement('s-statistic')
class StatisticElement extends LitElement {
  static styles = [cardStyle, hostStyle, cardFlexStyle];

  // 公共属性
  @property({ type: String, reflect: true })
  type: StatisticType = StatisticType.CARD_BASIC;

  @property({ type: String, reflect: true, attribute: 'space-mode' })
  spaceMode: SpaceModeType = 'scroll';

  @property({ type: String, reflect: true, attribute: 'vertical-align' })
  verticalAlign: VerticalAlignType = 'center';

  @property({ type: Object })
  styles = {};

  // 不支持外部的className
  // https://lit-element.polymer-project.org/guide/styles#external-stylesheet
  @property({ type: Object })
  classs = {};

  @property({ type: Object })
  params: CardBasicType | CardAverageType = {};

  @property({ type: Array })
  dataSource: DataSourceType[] = [];

  // 外部调用的方法统一放在此处，可避免function不被解析 otherFunc={testFunc:()=>{}}
  @property({ type: Object })
  otherFunc: any;

  // 内部变量
  @state()
  private _selectedData = {};

  private _onTestSelectClick(e: MouseEvent) {
    // 阻止click事件冒泡
    e.stopPropagation();
    // onTestSelect事件向上冒泡，
    // document.querySelector('html').addEventListener('onTestSelect',function(e) {
    //   console.log("onTestSelect 冒泡");
    // });
    const event = new CustomEvent('onTestSelect', {
      bubbles: true,
      composed: true,
      detail: { temData: new Date() },
    });
    this.dispatchEvent(event);
  }

  _onExternalFunc = () => {
    const { otherFunc } = this;
    console.log('testFunc', otherFunc);
    console.log('params', otherFunc.testFunc('---'));
  };

  private _renderEmptyTips = () => {
    return html` <empty-tips></empty-tips> `;
  };

  private _handleOnSelectClick = (e: CustomEvent) => {
    const { otherFunc: { onSelect } = {} } = this;
    const { key, type } = e.detail;
    this._selectedData = { selectedType: type, selectedKey: key };
    // 不向外发送事件，只传递函数给外部使用
    onSelect?.({ ...e.detail });
  };

  private _renderCardItem = (data: DataSourceType = {}, type = 'first') => {
    const { _selectedData, params = {}, spaceMode } = this;
    const { valueStyle, selectable, formatters = {} } = params;
    const { key = '' } = data;
    return html`<card-item
      type=${type}
      .spaceMode=${spaceMode}
      .valueStyle=${valueStyle}
      .selectable=${selectable}
      .selectedData=${_selectedData}
      .formatter=${formatters[key]}
      .dataSource=${data}
      @onSelectClick=${this._handleOnSelectClick}
    ></card-item> `;
  };

  private _renderBasic = () => {
    const { params = {}, dataSource } = this;
    const { flow, align } = params;
    const [data0, ...others] = dataSource;
    return html`
      <div class="card-group card-main align-${flow}-${align}">
        ${this._renderCardItem(data0, 'first')}
      </div>
      <div class="card-group card-sec align-${flow}-${align}">
        ${others.map((item) => this._renderCardItem(item, 'other'))}
      </div>
    `;
  };

  private _renderAverage = () => {
    const { params = {}, dataSource } = this;
    const { flow, align } = params;
    return html`
      <div class="card-group align-${flow}-${align}">
        ${dataSource.map((item) => this._renderCardItem(item, 'first'))}
      </div>
    `;
  };
  render() {
    const { type, dataSource } = this;
    const { ...data } = this;
    // console.log('statistic this', data);

    if (!dataSource.length) return this._renderEmptyTips();

    if (type === 'card-basic') return this._renderBasic();

    return html` ${this._renderAverage()} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    's-statistic': StatisticElement;
  }
}

export default StatisticElement;
