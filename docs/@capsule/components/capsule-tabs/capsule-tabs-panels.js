import { LitElement, html } from '../../lit';

class CapsuleTabsPanels extends LitElement {
  static properties = {
    animation: { type: String, reflect: true },
  };

  constructor() {
    super();
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-tabs-panels', CapsuleTabsPanels);
