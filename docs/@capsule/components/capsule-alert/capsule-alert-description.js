import { LitElement, html } from '../../lit';

class AlertDescription extends LitElement {
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

customElements.define('capsule-alert-description', AlertDescription);
