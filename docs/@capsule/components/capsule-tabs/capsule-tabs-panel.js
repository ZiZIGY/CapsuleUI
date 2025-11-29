import { LitElement, html } from '../../lit';

class CapsuleTabsPanel extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
    this._updateAriaAttributes();
  }

  updated(changedProperties) {
    if (changedProperties.has('active')) {
      this._updateAriaAttributes();
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  _updateAriaAttributes() {
    const isActive =
      this.hasAttribute('active') && this.getAttribute('active') !== 'false';
    const value = this.getAttribute('value');

    this.setAttribute('aria-hidden', isActive ? 'false' : 'true');

    if (value) {
      this.setAttribute('id', `tabs-panel-${value}`);
      this.setAttribute('aria-labelledby', `tabs-trigger-${value}`);
    }
  }
}

customElements.define('capsule-tabs-panel', CapsuleTabsPanel);
