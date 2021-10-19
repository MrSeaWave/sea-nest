import type { StyleInfo } from 'lit-html/directives/style-map';
import type { NumeraTypeName } from '@sea-org/s-utils/dist/interfaces';

export enum StatisticType {
  CARD_BASIC = 'card-basic',
  CARD_AVERAGE = 'card-average',
}

// 空间模式
export type SpaceModeType = 'scroll' | 'ellipsis';

export type VerticalAlignType = 'top' | 'center' | 'bottom';

export type FormatterType =
  | {
      type?: NumeraTypeName;
      /**
       * 前缀
       */
      prefix?: string;
      /**
       * 后缀
       */
      suffix?: string;
      /**
       * 标签样式
       */
      labelStyle?: StyleInfo;
      /**
       * 数值样式
       */
      valueStyle?: StyleInfo;
    }
  | Function
  | NumeraTypeName;

type BasicType = {
  // 是否开启选中功能
  selectable?: boolean;
  // 排列方式
  align?: 'left' | 'center' | 'right' | 'around' | 'between';
  flow?: 'row' | 'column';
  // 数值样式
  valueStyle?: StyleInfo;
  // 数值格式化方法
  formatters?: { [name: string]: FormatterType };
};

// 配置
export type CardBasicType = BasicType;
export type CardAverageType = BasicType;

// 数据源
export type DataSourceType = {
  name?: string;
  key?: string;
  value?: any;
};

// 选中后触发事件返回的数据类型
export type SelectedType = { selectedKey?: string | null; selectedType?: 'label' | 'value' | null };
