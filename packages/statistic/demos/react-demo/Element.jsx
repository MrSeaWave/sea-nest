import React from 'react';
import { createComponent } from '@lit-labs/react';
// import StatisticElement from '../../dist/index.esm.js';
// import StatisticElement from '../../src/index.ts';
import StatisticElement from '@sea-org/s-statistic';

export const MyElementComponent = createComponent(React, 's-statistic', StatisticElement, {
  onTestSelect: 'onTestSelect',
});
