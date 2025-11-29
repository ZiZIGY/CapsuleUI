import { LitElement, html } from '../../lit';

class CapsuleBreadcrumb extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Breadcrumb');
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-breadcrumb', CapsuleBreadcrumb);
