import { LitElement, html } from '../../lit';

class CapsuleChip extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleChip);
