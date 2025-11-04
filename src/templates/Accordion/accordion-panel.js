import { LitElement, html } from '../../lit';

class CapsuleAccordionPanel extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
  }

  toggle() {
    const event = new CustomEvent('panel-toggle', {
      bubbles: true,
      detail: { panel: this },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('__PREFIX__-__COMPONENT__-panel', CapsuleAccordionPanel);
