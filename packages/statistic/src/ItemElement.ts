import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardItemStyle, itemHostStyle, selectedStyle } from './styles';
import { DataSourceType, FormatterType, SelectedType, SpaceModeType } from './interfaces';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
// @ts-ignore
import { valueFormat } from '@sea-org/s-utils';
import { getInitialStyle } from './utils/dom';

const { getFormatter } = valueFormat;
// Registers the element
@customElement('card-item')
class ItemElement extends LitElement {
  static styles = [itemHostStyle, cardItemStyle, selectedStyle];

  @property()
  type = 'first';

  @property({ type: String, reflect: true, attribute: 'space-mode' })
  spaceMode: SpaceModeType = 'scroll';

  @property({ type: Object })
  valueStyle = {};

  @property({ type: Boolean })
  selectable = false;

  @property({ type: Object })
  selectedData: SelectedType = {};

  @property({ type: Object })
  formatter: FormatterType = {};

  @property({ type: Object })
  dataSource: DataSourceType = {};

  private _handleFormatData = () => {
    const { formatter = {} } = this;
    switch (typeof formatter) {
      case 'string':
        return { type: formatter };
      case 'function':
        return formatter();
      default:
        return formatter;
    }
  };

  private _handleOnClick = (type: string) => (e: MouseEvent) => {
    e.stopPropagation();
    const { selectable } = this;
    if (!selectable) return;
    const { dataSource = {} } = this;
    const { key, name, value } = dataSource;
    // 传递onSelectClick事件
    const event = new CustomEvent('onSelectClick', {
      detail: { key, type, style: getInitialStyle(e.target as HTMLElement) },
    });
    this.dispatchEvent(event);
  };

  render() {
    const { ...data } = this;
    const { selectable, selectedData = {}, dataSource, formatter, valueStyle = {} } = this;
    const { key, name, value } = dataSource;
    const { selectedKey, selectedType } = selectedData;

    const {
      type = 'string',
      prefix = '',
      suffix = '',
      valueStyle: formatValueStyle = {},
      labelStyle = {},
    } = this._handleFormatData();

    const formatFunc = getFormatter(type);

    const labelClass = {
      'card-item-label': true,
      'cursor-handler': selectable,
      selected: selectedKey === key && selectedType === 'label',
    };
    const valueClass = {
      'card-item-value': true,
      'cursor-handler': selectable,
      selected: selectedKey === key && selectedType === 'value',
    };
    const valueStyles = {
      ...valueStyle,
      ...formatValueStyle,
    };

    return html`
      <div
        class=${classMap(labelClass)}
        style=${styleMap(labelStyle)}
        @click=${this._handleOnClick('label')}
      >
        ${name}
      </div>
      <div
        class=${classMap(valueClass)}
        style=${styleMap(valueStyles)}
        @click=${this._handleOnClick('value')}
      >
        <span class="card-item-value-prefix">${prefix}</span>
        <label>${formatFunc(value)}</label>
        <span class="card-item-value-suffix">${suffix}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-item': ItemElement;
  }
}

export default ItemElement;
