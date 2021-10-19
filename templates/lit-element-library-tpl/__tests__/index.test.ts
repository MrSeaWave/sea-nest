import { HelloWorldElement } from '../src';
import userEvent from '@testing-library/user-event';
import { screen } from 'testing-library__dom';

describe('{{projectName}}', () => {
  const CUSTOM_TAG = 'hello-world';
  it('is defined', () => {
    const el = document.createElement(CUSTOM_TAG);
    expect(el).toBeInstanceOf(HelloWorldElement);
  });
  it('hello world display', async () => {
    const el = document.createElement(CUSTOM_TAG) as HelloWorldElement;
    el.setAttribute('data-testid', 'custom-id');
    document.body.appendChild(el);
    await el.updateComplete;

    // ==><h1>Hello, <!--?lit$614341753$-->World!</h1>
    const elements = screen.getAllByRole('heading');

    expect(el).toContainHTML(`<${CUSTOM_TAG} data-testid="custom-id"/>`);
    expect(elements[0]).toHaveTextContent('Hello, World!');
  });
});
