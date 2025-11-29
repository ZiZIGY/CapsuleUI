import { LitElement, html } from '../../lit';

class CapsuleTooltipContent extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tooltip');
    this.setAttribute('part', 'tooltip');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-tooltip-content', CapsuleTooltipContent);

