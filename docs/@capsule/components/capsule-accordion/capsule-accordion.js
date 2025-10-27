class Accordion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._setupEventListeners();
    this._updateAriaAttributes();
    this._setDefaultOpenState();
  }

  static get observedAttributes() {
    return ['type', 'collapsible'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      this._handleTypeChange();
    }
  }

  _setupEventListeners() {
    this.addEventListener('panel-toggle', this._handlePanelToggle.bind(this));
  }

  _getPanels() {
    return Array.from(this.querySelectorAll('capsule-accordion-panel'));
  }

  _handlePanelToggle(event) {
    const panel = event.detail.panel;
    const isOpen = panel.hasAttribute('open');
    const type = this.getAttribute('type') || 'single';
    const collapsible = this.hasAttribute('collapsible');

    if (type === 'single') {
      const panels = this._getPanels();

      panels.forEach((otherPanel) => {
        if (otherPanel !== panel && otherPanel.hasAttribute('open')) {
          otherPanel.removeAttribute('open');
        }
      });

      if (isOpen && !collapsible) {
        return;
      }
      panel.toggleAttribute('open');
    } else if (type === 'multiple') {
      panel.toggleAttribute('open');
    }
  }

  _handleTypeChange() {
    const type = this.getAttribute('type') || 'single';
    if (type === 'single') {
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

  _updateAriaAttributes() {
    const type = this.getAttribute('type') || 'single';
    this.setAttribute('role', 'region');
    this.setAttribute('aria-multiselectable', type === 'multiple');
  }

  _setDefaultOpenState() {
    const type = this.getAttribute('type') || 'single';
    const collapsible = this.hasAttribute('collapsible');
    const panels = this._getPanels();

    if (!collapsible && type === 'single' && panels.length > 0) {
      const hasAnyOpenPanel = panels.some((panel) =>
        panel.hasAttribute('open')
      );

      if (!hasAnyOpenPanel) {
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
}

customElements.define('capsule-accordion', Accordion);
