import { css } from 'lit';

export const spanStyle = css`
  span {
    color: green;
  }
  :host {
    color: blue;
  }
`;

export const hostStyle = css`
  :host {
    display: flex;
    flex-flow: column;
    min-width: 100px;
    height: 100%;
    font-size: 12px;
    line-height: 1.5;
    padding: 0.5em 0;
    overflow: auto;
  }
  :host([type='card-basic']) {
  }
  :host([type='card-basic']) {
  }
  :host([vertical-align='center']) {
    place-content: center;
  }
  :host([vertical-align='top']) {
    place-content: flex-start;
  }
  :host([vertical-align='bottom']) {
    place-content: flex-end;
  }
`;

export const cardStyle = css`
  .card-group {
    display: flex;
    flex-wrap: wrap;
  }
  :host([space-mode='ellipsis']) .card-group {
    flex-wrap: nowrap;
  }
  .card-main {
  }
  .card-sec {
    line-height: 1.2;
    margin-top: 2px;
  }
  .card-group.card-sec {
    line-height: 1.2;
    margin-top: 2px;
  }
`;

export const itemHostStyle = css`
  :host {
    padding: 0 1em;
    font-family: Helvetica;
    box-sizing: border-box;
  }
  :host([type='other']) {
    font-size: 1em;
    color: #a0a0a0;
  }
  :host([space-mode='ellipsis'][type='first']) {
    overflow: hidden;
  }
  :host([space-mode='ellipsis'][type='other']) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const cardItemStyle = css`
  .cursor-handler {
    cursor: pointer;
  }

  .card-item-label {
    font-size: 1.5em;
    line-height: 1.5;
    box-sizing: border-box;
    border: 1px solid transparent;
    overflow: hidden;
  }
  .card-item-value {
    font-weight: 600;
    font-size: 3em;
    white-space: nowrap;
    box-sizing: border-box;
    border: 1px solid transparent;
  }
  .card-item-value-prefix,
  .card-item-value-suffix,
  .card-item-value label {
    cursor: inherit;
  }
  .card-item-value-suffix {
    font-size: 0.4em;
  }

  :host([type='other']) .card-item {
    font-size: 1em;
    color: #a0a0a0;
  }
  :host([type='other']) .card-item-label {
    font-size: inherit;
    display: inline;
  }
  :host([type='other']) .card-item-label:after {
    content: ': ';
    display: inline-block;
    width: 0;
    height: 0;
  }
  :host([type='other']) .card-item-value {
    display: inline-block;
    margin-left: 5px;
    font-weight: 400;
    font-size: inherit;
  }
  :host([type='other']) .card-item-value span {
    padding-left: 0.2em;
  }
  :host([space-mode='ellipsis']) .card-item-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const selectedStyle = css`
  .selected {
    border: 1px solid hsla(0, 0%, 62.7%, 0.8);
  }
`;
export const cardFlexStyle = css`
  .flow-row {
    flex-direction: row;
  }
  .flow-column {
    flex-direction: column;
  }
  .align-row-left {
    justify-content: flex-start;
  }
  .align-row-center {
    justify-content: center;
  }
  .align-row-right {
    justify-content: flex-end;
  }
  .align-row-around {
    justify-content: space-around;
  }
  .align-row-between {
    justify-content: space-between;
  }
  .align-column-left {
    align-items: flex-start;
  }
  .align-column-center {
    align-items: center;
  }
  .align-column-right {
    align-items: flex-end;
  }
`;

export const tipsStyle = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    font-size: 24px;
    color: rgba(180, 180, 180, 0.45);
    overflow: hidden;
  }
  .tips-text {
    max-height: 100%;
  }
`;

// verticalAlign 去重复定义host即可
// 参考perInstanceStyle
