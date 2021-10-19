import React, { useState } from 'react';
import { MyElementComponent } from './Element';
import { getData } from '../utils';

const testFunc = (v) => {
  console.log('react vvvv', v);
};

function setScale() {
  let designWidth = 1366; // 设计稿的宽度，根据实际项目调整
  let designHeight = 768; // 设计稿的高度，根据实际项目调整
  let scale =
    document.documentElement.clientWidth / document.documentElement.clientHeight <
    designWidth / designHeight
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight;
  // document.querySelector('s-statistic').style.transform = `scale(${scale}) translate(-50%)`;
  document.querySelector('s-statistic').style.transform = `scale(${scale}) `;
}
// window.onresize = function () {
//   console.log('1234')
//   setScale()
// };

function App() {
  const [type, setType] = useState('basic');
  const [spaceMode, setSpaceMode] = useState('scroll');
  const data = getData(type);
  return (
    <div
      onClick={(e) => {
        console.log('div event', e);
      }}
    >
      <h1>Hello, World!</h1>
      <h2>当前数据类型：{type}</h2>
      <MyElementComponent
        type={data.type}
        spaceMode={spaceMode}
        verticalAlign={data.verticalAlign}
        style={data.style}
        className={data.className}
        dataSource={data.dataSource}
        params={data.params}
        otherFunc={{
          ...data.otherFunc,
          testFunc: testFunc,
          // onSelect: (params) => {
          //   console.log('params', params);
          // },
        }}
        onTestSelect={(e) => {
          console.log('react onSelect', e);
          // e.stopPropagation()
        }}
      />
      <div>数据组：</div>
      <button
        onClick={() => {
          setType('empty');
        }}
      >
        empty Data
      </button>
      <button
        onClick={() => {
          setType('basic');
        }}
      >
        basic Data
      </button>{' '}
      <button
        onClick={() => {
          setType('average');
        }}
      >
        average Data
      </button>{' '}
      <div style={{ marginTop: 20 }}>配置：</div>
      <button
        onClick={(e) => {
          console.log('e', e);
          e.stopPropagation();
          setSpaceMode(spaceMode === 'scroll' ? 'ellipsis' : 'scroll');
        }}
      >
        点击设定SpaceMode:{spaceMode}
      </button>
      <button
        onClick={() => {
          setScale();
        }}
      >
        点击缩放scale
      </button>
    </div>
  );
}

export default App;
