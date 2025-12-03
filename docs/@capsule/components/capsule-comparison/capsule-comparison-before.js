import { LitElement, html } from '../../lit';

class CapsuleComparisonBefore extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(
  'capsule-comparison-before',
  CapsuleComparisonBefore
);

