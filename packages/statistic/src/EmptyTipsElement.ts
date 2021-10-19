import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tipsStyle } from './styles';

// Registers the element
@customElement('empty-tips')
class EmptyTipsElement extends LitElement {
  static styles = [tipsStyle];

  // 公共属性
  @property({ type: String, reflect: true })
  text = '暂无数据';

  render() {
    const { text } = this;
    return html` <div class="tips-text">${text}</div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'empty-tips': EmptyTipsElement;
  }
}

export default EmptyTipsElement;
