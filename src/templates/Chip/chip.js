class Chip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
      <capsule-ripple></capsule-ripple>
    `;
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Chip);
