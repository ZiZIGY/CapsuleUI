import { LitElement, html } from '../../lit';

class CapsuleAlert extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'alert');
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleAlert);
