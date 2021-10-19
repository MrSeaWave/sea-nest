import { transformData } from '../src/index';
const { transformStyles } = transformData;

const style = {
  color: '#ff5676',
  fontSize: 14,
};

describe('transformStyles utils', () => {
  it('transformStyles fontSize:', () => {
    const val = transformStyles(style);
    expect(val).toEqual({ color: '#ff5676', 'font-size': '14px' });
  });
});
