import { LitElement, html } from '../../lit';

class CapsuleTabsList extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-tabs-list', CapsuleTabsList);
