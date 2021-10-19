// @ts-nocheck

import { getDiffableHTML } from './get-diffable-html';
import { getCleanedShadowDom, getLightDomHtml, getOuterHtml } from './utils';

/**
 *
 * @param {string} actual
 * @param {string} expected
 * @param {DiffOptions} [options]
 */
const assertHtmlEquals = (actual, expected, options = {}) => {
  const actualDiffAbleHtml = getDiffableHTML(actual, options);
  const expectedDiffAbleHTML = getDiffableHTML(expected, options);
  return actualDiffAbleHtml === expectedDiffAbleHTML;
};

export const isEqualByDom = (el, expectedHTML, options = {}) => {
  const actualHtml = getOuterHtml(el);
  return assertHtmlEquals(actualHtml, expectedHTML, options);
};

export const isEqualByLightDom = (el, expectedHTML, options = {}) => {
  const actualHtml = getLightDomHtml(el);
  return assertHtmlEquals(actualHtml, expectedHTML, options);
};

export const isEqualByShadowDom = (el, expectedHTML, options = {}) => {
  const actualHtml = getCleanedShadowDom(el);
  return assertHtmlEquals(actualHtml, expectedHTML, options);
};
