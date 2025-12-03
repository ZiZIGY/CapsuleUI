import { LitElement, html } from '../../lit';

class CapsuleComparisonAfter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-comparison-after', CapsuleComparisonAfter);

