// hello world

// 创建指标卡的html标签
class HelloWorldElement extends HTMLElement {
  constructor() {
    // 必须调用 super 方法
    super();

    // 创建一个 div 标签
    const $box = document.createElement('p');
    let userName: string | null = 'User Name';
    if (this.hasAttribute('name')) {
      // 如果存在 name 属性，读取 name 属性的值
      userName = this.getAttribute('name');
    }
    // 设置 div 标签的文本内容
    $box.innerText = `Hello ${userName}`;

    // 创建一个 shadow 节点，创建的其他元素应附着在该节点上
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild($box);

    $box.addEventListener('click', () => {
      console.log('触发 clickHandler && onchange');
      this.dispatchEvent(
        new CustomEvent('clickHandler', {
          detail: {
            value: 1234,
          },
        })
      );
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: 1234,
          },
        })
      );
    });
  }
  // 让外界可以获取name属性
  get name() {
    return this.getAttribute('name');
  }
  connectedCallback() {
    console.log('connectedCallback');
    // 5s 后移动元素到 iframe
    // setTimeout(() => {
    //   const iframe = document.getElementsByTagName('iframe')[0];
    //   // @ts-ignore
    //   iframe.contentWindow.document.adoptNode(this);
    // }, 5e3);
  }
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
  adoptedCallback() {
    console.log('adoptedCallback');
  }
}

export default HelloWorldElement;
