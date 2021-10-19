import { averageData, basicData } from './data';

export function getData(type) {
  switch (type) {
    case 'empty':
      return { ...basicData, dataSource: [] };
    case 'basic':
      return basicData;
    case 'average':
      return averageData;
    default:
      return {};
  }
}
