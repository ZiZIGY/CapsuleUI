import { LitElement, html } from '../../lit';

class CapsuleBreadcrumbEllipsis extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-hidden', 'true');
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  render() {
    return html`<slot>...</slot>`;
  }
}

customElements.define('capsule-breadcrumb-ellipsis', CapsuleBreadcrumbEllipsis);
