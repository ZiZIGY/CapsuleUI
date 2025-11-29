import { LitElement, html } from '../../lit';

class CapsuleAlertDescription extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(
  '__PREFIX__-__COMPONENT__-description',
  CapsuleAlertDescription
);
