import { LitElement, html } from '../../lit';

class CapsuleButtonGroup extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-button-group', CapsuleButtonGroup);
