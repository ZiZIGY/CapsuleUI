import { LitElement, html } from '../../lit';

class CapsuleDivider extends LitElement {
  static properties = {
    orientation: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.orientation = 'horizontal';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
    this._updateAriaOrientation();
  }

  updated(changedProperties) {
    if (changedProperties.has('orientation')) {
      this._updateAriaOrientation();
    }
  }

  _updateAriaOrientation() {
    this.setAttribute('aria-orientation', this.orientation);
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-divider', CapsuleDivider);
