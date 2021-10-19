export const basicData = {
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
    onSelect: (params) => {
      console.log('basic params', params);
    },
  },
};

export const averageData = {
  type: 'card-average',
  verticalAlign: 'top',
  style: {
    lineHeight: '5em',
  },
  className: '',

  params: {
    // 是否开启选中功能
    selectable: true,
    // 对齐
    flow: 'row',
    // 排列
    align: 'around',

    valueStyle: {},
    formatters: {
      value: {
        type: 'abbr',
        suffix: '人',
      },
      value1: {
        type: '.4percent',
        suffix: '↑',
        valueStyle: {
          color: '#ff5676',
          fontSize: '14px',
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
      name: '用户数',
      key: 'value',
      value: 9876543,
    },
    {
      name: '同比',
      key: 'value1',
      value: 0.3,
    },
    {
      name: '环比',
      key: 'value2',
      value: -0.9,
    },
  ],
  otherFunc: {
    // 配合selectable使用
    onSelect: (params) => {
      console.log('average params', params);
    },
  },
};
