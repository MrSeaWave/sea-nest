import { valueFormat } from '../src/index';

describe('valueFormat utils', () => {
  it('getFormatter number', () => {
    const formatFunc = valueFormat.getFormatter('number');
    const val = formatFunc(12345);
    expect(val).toBe('12,345');
  });
  it('getFormatter integer', () => {
    const formatFunc = valueFormat.getFormatter('integer');
    const val1 = formatFunc(12345.1234);
    const val2 = formatFunc(12345.567);
    expect(val1).toBe('12,345');
    expect(val2).toBe('12,346');
  });
  it('getFormatter string', () => {
    const formatFunc = valueFormat.getFormatter('string');
    const val = formatFunc(12345);
    expect(val).toBe('12345');
  });
  it('getFormatter decimal', () => {
    const formatFunc = valueFormat.getFormatter('decimal');
    const val = formatFunc(12345.789123);
    expect(val).toBe('12,345.79');
  });
  it('getFormatter percentSuffix', () => {
    const formatFunc = valueFormat.getFormatter('percentSuffix');
    const val = formatFunc(12345.7123);
    const val2 = formatFunc(12345.7123, { place: 2 });
    expect(val).toBe('12,345.7123%');
    expect(val2).toBe('12,345.71%');
  });
  it('getFormatter abbr', () => {
    const formatFunc = valueFormat.getFormatter('abbr');
    const val = formatFunc(12345078.145);
    expect(val).toBe('1,234.5078145万');
  });
});
