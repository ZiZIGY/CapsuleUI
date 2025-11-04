import { LitElement, html } from '../../lit';

class CapsuleAccordion extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    collapsible: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.type = 'single';
    this.collapsible = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-multiselectable', this.type === 'multiple');
    this._setDefaultOpenState();
  }

  _handlePanelToggle(panel) {
    if (this.type === 'single' && panel.open) {
      const panels = this.querySelectorAll('capsule-accordion-panel');

      panels.forEach((otherPanel) => {
        if (otherPanel !== panel && otherPanel.open) {
          otherPanel.open = false;
        }
      });
    }
  }

  _setDefaultOpenState() {
    if (!this.collapsible && this.type === 'single') {
      const panels = this.querySelectorAll('capsule-accordion-panel');
      const hasOpen = Array.from(panels).some((panel) => panel.open);

      if (!hasOpen && panels.length > 0) {
        panels[0].open = true;
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-accordion', CapsuleAccordion);
