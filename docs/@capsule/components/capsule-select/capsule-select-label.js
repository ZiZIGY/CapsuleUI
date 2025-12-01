import { LitElement, html } from '../../lit';

class CapsuleSelectLabel extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('part', 'label');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-select-label', CapsuleSelectLabel);