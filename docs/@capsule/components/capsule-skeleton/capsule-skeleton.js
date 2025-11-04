import { LitElement, html } from '../../lit';

class CapsuleSkeleton extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-skeleton', CapsuleSkeleton);
