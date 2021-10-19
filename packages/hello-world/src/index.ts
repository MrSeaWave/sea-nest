import HelloWorldElement from './HelloWorld';

// export default HelloWorldElement;

declare global {
  interface Window {
    HelloWorldElement: typeof HelloWorldElement;
  }
  interface HTMLElementTagNameMap {
    's-hello-world': HelloWorldElement;
  }
}

// 定义一个名为 <s-hello-world /> 的元素
if (!window.customElements.get('s-hello-world')) {
  window.HelloWorldElement = HelloWorldElement;
  window.customElements.define('s-hello-world', HelloWorldElement);
}
