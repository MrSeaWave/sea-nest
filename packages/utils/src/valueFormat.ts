import numeral from 'numeral';
import { reduce, map } from 'lodash-es';
// import map from 'lodash-es/map';
// import reduce from 'lodash-es/reduce';
import { NumeraTypeName } from './interfaces';

const emptyValue = '--';
const abbrList = [
  { unit: '亿', number: 10000 * 10000 },
  { unit: '万', number: 10000 },
];

numeral.nullFormat(emptyValue);

// 小数格式化
const decimalPlace = (place = 0) => {
  return '.'.padEnd((place > 10 ? 10 : place) + 1, '0');
};

const isEmpty = (value: any) => {
  return !value && value !== 0;
};

// 备份
const renderString1 = (value: string | number): string => {
  return value.toString().replace(/\d+/, (n) => {
    return n.replace(/\B(?=(?:\d{3})+$)/g, ',');
  });
};

export const numeralFormat = {
  /**
   * 整数
   * @param value
   * @returns
   */
  integer: (value: string | number) => numeral(value).format('0,0'),
  /**
   * 数据整数使用千分位展示
   * place = 10，至多保留小数位数，默认最多10位小数
   */
  number: (value: string | number, { place = 10 } = {}) => {
    if (isEmpty(value)) return emptyValue;
    const val = numeral(value).format(`0,0${'.['.padEnd((place > 10 ? 10 : place) + 2, '0')}]`);
    return val === emptyValue ? String(value) : val;
  },
  /**
   * 定制小数位
   * @param value
   * @param param1
   * @returns
   */
  decimal: (value: string | number, { place = 2 } = {}): string => {
    return numeral(value).format(`0,0${decimalPlace(place)}`);
  },
  /**
   * 小数->百分比展示
   * @param value
   * @param param1
   * @returns
   */
  percent: (value: string | number, { place = 2 } = {}): string => {
    if (isEmpty(value)) return emptyValue;
    return numeral(value).format(`0${decimalPlace(place)}%`);
  },
  /**
   * 添加百分比符号
   * @param value
   * @param params
   * @returns
   */
  percentSuffix: (value: string | number, params: any): string => {
    if (isEmpty(value)) return emptyValue;
    return (
      (params?.place === undefined
        ? numeralFormat.number(value, params)
        : numeralFormat.decimal(value, params)) + '%'
    );
  },
  /**
   * 字符串展示
   * @param value
   * @returns
   */
  string: (value: string | number) => (!isEmpty(value) ? value.toString() : ''),
  /**
   * 中文缩写
   * @param value
   * @param params
   * @returns
   */
  abbr: (value: string | number, params: any): string => {
    if (isEmpty(value)) return emptyValue;

    let { maxValue = 0, place } = params || {};

    let unit = '';
    let newValue = value;

    maxValue = maxValue || value;

    abbrList.some((abbr) => {
      if (maxValue < abbr.number) return false;
      unit = abbr.unit;
      newValue = Number(value) / abbr.number;
      return true;
    });

    return numeralFormat[place ? 'decimal' : 'number'](newValue, { place }) + unit;
  },
};

/**
 * 分离类型与保留位数
 * 注：最多保留9位
 * @param format
 * @returns [类型，小数位（0-9位）]
 */
export const parsePrecision = (format = ''): [NumeraTypeName, number | undefined] => {
  const res = format.match(/\.([\d]*)([\S]*)/);
  if (res && (res[1] || res[2])) {
    const place = Number(res[1]);
    return [res[2] as NumeraTypeName, place < 10 ? place : 9];
  } else {
    return [format as NumeraTypeName, undefined];
  }
};

/**
 * 获取format方法
 * @param format format类型，详情请参考NumeraTypeName类型
 * @returns format方法
 */
export const getFormatter = (format = '') => {
  const [type, place] = parsePrecision(format);

  if (place === undefined) {
    return numeralFormat[format as NumeraTypeName] || numeralFormat['string'];
  } else {
    const fun = numeralFormat[type] || numeralFormat['string'];
    return (value: number | string, params: any) => fun(value, { place, ...params });
  }
};

/**
 * 简单计算
 */
export const simpleCount = {
  sum(total: number, value: any, key?: string): number {
    let val = value;
    if (value && key && typeof value === 'object') {
      val = value[key];
    }
    return total + (isNaN(Number(val)) ? 0 : Number(val));
  },
  /**
   * 当前值在总数中的占比
   * 1. 当 total 为 0 时，返回：Infinity
   * 2. 当 total 为 非数值时，返回：NaN
   * @param val 当前值
   * @param total 总数
   * @returns 当前值在总数中的占比（小于1的小数表现形式）
   */
  ratio(val: number, total: number): number {
    return (isNaN(val) ? 0 : val) / total;
  },
};

const listSum = (valueList: number[]) => reduce(valueList, simpleCount.sum, 0);

/**
 * 获取数组各元素百分比
 * 此方法可以保证所有子项百分比和为100%
 * @param valueList 数据集合
 * @param precision 精度
 */
export const getPercentListWithPrecision = (valueList: number[], precision = 2) => {
  if (!valueList?.length) return [];
  const sum = listSum(valueList);
  if (sum === 0) return new Array(valueList.length).fill(0);

  let digits = Math.pow(10, precision);
  let votesPerQuota = map(valueList, (val: number) => {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });
  let targetSeats = digits * 100;

  let seats = map(votesPerQuota, (votes: number) => {
    // Assign automatic seats.
    return Math.floor(votes);
  });
  let currentSum = listSum(seats);

  let remainder = map(votesPerQuota, (votes: number, idx: string | number) => {
    // @ts-ignore
    return votes - seats[idx];
  });

  // Has remainding votes.
  while (currentSum < targetSeats) {
    // Find next largest remainder.
    let max = Number.NEGATIVE_INFINITY;
    let maxId = -1;
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }

    // Add a vote to max remainder.
    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }

  return seats.map((i: number) => i / digits);
};

/**
 * 获取数组中对应下标的百分比
 * 此方法可以保证所有子项百分比和为100%
 * @param valueList 数据集合
 * @param idx 数据下标
 * @param precision 精度
 */
export const getPercentWithPrecision = (valueList: number[], idx: number, precision = 2) => {
  if (!valueList || !valueList[idx]) return 0;
  const percentList = getPercentListWithPrecision(valueList, precision);
  return percentList[idx];
};
