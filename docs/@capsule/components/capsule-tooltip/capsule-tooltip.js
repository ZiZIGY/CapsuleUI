import { LitElement, html } from '../../lit';

class CapsuleTooltip extends LitElement {
  static properties = {
    placement: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.placement = 'top';
    this.disabled = false;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tooltip');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-tooltip', CapsuleTooltip);
