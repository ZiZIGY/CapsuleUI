import { LitElement, html } from '../../lit';

class CapsuleKbd extends LitElement {
  static properties = {
    size: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.size = 'md';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-kbd', CapsuleKbd);
