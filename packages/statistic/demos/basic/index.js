import { basicData, averageData } from '../data';
import { getData } from '../utils';
import React from 'react';
const data = basicData;
console.log('数据', data);
const rsEl = document.querySelector('s-statistic');

const typeEl = document.querySelector('#type');
const btnGroupEl = document.querySelector('#btn-group');

// console.log('buttonEl',buttonEl)
rsData('basic');

function rsData(type) {
  const data = getData(type);
  rsEl.type = data.type;
  rsEl.verticalAlign = data.verticalAlign;
  rsEl.style = data.style;
  rsEl.className = data.className;
  rsEl.dataSource = data.dataSource;
  rsEl.params = data.params;
  rsEl.otherFunc = data.otherFunc;
}

function btnClickFunc(e) {
  typeEl.innerHTML = `当前数据类型：${e.target.value}`;
  rsData(e.target.value);
}

btnGroupEl.addEventListener('click', btnClickFunc);
