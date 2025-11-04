import { LitElement, html } from '../../lit';

class CapsuleAccordionContent extends LitElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(
  '__PREFIX__-__COMPONENT__-content',
  CapsuleAccordionContent
);
