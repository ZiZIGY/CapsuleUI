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

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      const accordion = this.closest('capsule-accordion');
      if (accordion) {
        accordion._handlePanelToggle(this);
      }

      if (this.open) {
        this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
      } else {
        this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
      }
      this.dispatchEvent(
        new CustomEvent('toggle', {
          bubbles: true,
          detail: { open: this.open },
        })
      );
    }
  }

  toggle() {
    this.open = !this.open;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-accordion-panel', CapsuleAccordionPanel);
