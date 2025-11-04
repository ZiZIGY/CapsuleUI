import { LitElement, html } from '../../lit';

class CapsuleAccordionTrigger extends LitElement {
  static properties = {
    excludeSelf: { type: Boolean, reflect: true, attribute: 'exclude-self' },
  };

  constructor() {
    super();
    this.excludeSelf = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateAttributes();
  }

  updated(changedProperties) {
    if (changedProperties.has('excludeSelf')) {
      this._updateAttributes();
    }
  }

  _updateAttributes() {
    if (this.excludeSelf) {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
    } else {
      this.setAttribute('role', 'button');
      this.setAttribute('tabindex', '0');
    }
  }

  _handleClick(event) {
    event.preventDefault();

    if (this.excludeSelf) {
      if (event.currentTarget === event.target) return;
    }

    const panel = this.closest('__PREFIX__-__COMPONENT__-panel');
    if (panel) {
      panel.toggle();
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define(
  '__PREFIX__-__COMPONENT__-trigger',
  CapsuleAccordionTrigger
);
