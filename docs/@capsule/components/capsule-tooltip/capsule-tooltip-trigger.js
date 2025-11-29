import { LitElement, html } from '../../lit';

class CapsuleTooltipTrigger extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-tooltip-trigger', CapsuleTooltipTrigger);

