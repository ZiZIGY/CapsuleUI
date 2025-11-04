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
    this.addEventListener('click', this._handleClick.bind(this));
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

    if (this.excludeSelf && event.currentTarget === event.target) return;

    const panel = this.closest('capsule-accordion-panel');
    if (panel) {
      panel.toggle();
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(
  'capsule-accordion-trigger',
  CapsuleAccordionTrigger
);
