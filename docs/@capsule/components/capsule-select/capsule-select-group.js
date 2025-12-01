import { LitElement, html } from '../../lit';

class CapsuleSelectGroup extends LitElement {
  static properties = {
    disabled: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.disabled = false;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    
    if (this.disabled) {
      const items = this.querySelectorAll('capsule-select-item');
      items.forEach((item) => {
        item.disabled = true;
      });
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const items = this.querySelectorAll('capsule-select-item');
      items.forEach((item) => {
        item.disabled = this.disabled;
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-select-group', CapsuleSelectGroup);