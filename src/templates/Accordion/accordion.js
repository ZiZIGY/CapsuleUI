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
    this._updateAriaAttributes();
    this._setDefaultOpenState();
  }

  updated(changedProperties) {
    if (changedProperties.has('type')) {
      this._updateAriaAttributes();
      this._handleTypeChange();
    }
  }

  _updateAriaAttributes() {
    this.setAttribute('aria-multiselectable', this.type === 'multiple');
  }

  _getPanels() {
    return Array.from(this.querySelectorAll('__PREFIX__-__COMPONENT__-panel'));
  }

  _handlePanelToggle(panel) {
    const isOpen = panel.hasAttribute('open');

    if (this.type === 'single') {
      const panels = this._getPanels();

      panels.forEach((otherPanel) => {
        if (otherPanel !== panel && otherPanel.hasAttribute('open')) {
          otherPanel.removeAttribute('open');
        }
      });

      if (isOpen && !this.collapsible) {
        return;
      }
      panel.toggleAttribute('open');
    } else if (this.type === 'multiple') {
      panel.toggleAttribute('open');
    }
  }

  _handleTypeChange() {
    if (this.type === 'single') {
      const panels = this._getPanels();
      const openPanels = panels.filter((panel) => panel.hasAttribute('open'));
      if (openPanels.length > 1) {
        openPanels.slice(1).forEach((panel) => {
          panel.removeAttribute('open');
        });
      }
      this._setDefaultOpenState();
    }
  }

  _setDefaultOpenState() {
    if (!this.collapsible && this.type === 'single') {
      const panels = this._getPanels();
      const hasAnyOpenPanel = panels.some((panel) =>
        panel.hasAttribute('open')
      );

      if (!hasAnyOpenPanel && panels.length > 0) {
        const firstPanel = panels[0];
        firstPanel.setAttribute('open', '');
      }
    }
  }

  openPanel(index) {
    const panels = this._getPanels();
    const panel = panels[index];
    if (panel) {
      panel.setAttribute('open', '');
    }
  }

  closePanel(index) {
    const panels = this._getPanels();
    const panel = panels[index];
    if (panel) {
      panel.removeAttribute('open');
    }
  }

  togglePanel(index) {
    const panels = this._getPanels();
    const panel = panels[index];
    if (panel) {
      panel.toggleAttribute('open');
    }
  }

  openAll() {
    const panels = this._getPanels();
    panels.forEach((panel) => {
      panel.setAttribute('open', '');
    });
  }

  closeAll() {
    const panels = this._getPanels();
    panels.forEach((panel) => {
      panel.removeAttribute('open');
    });
  }

  getPanelCount() {
    return this._getPanels().length;
  }

  getOpenPanels() {
    return this._getPanels().filter((panel) => panel.hasAttribute('open'));
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleAccordion);
