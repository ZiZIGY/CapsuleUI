import { LitElement, html } from '../../lit';

class CapsuleBreadcrumbItem extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('itemscope', '');
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-breadcrumb-item', CapsuleBreadcrumbItem);
