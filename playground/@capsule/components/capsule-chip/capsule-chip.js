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

customElements.define('capsule-chip', Chip);
