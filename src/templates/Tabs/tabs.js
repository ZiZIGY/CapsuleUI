class Tabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._tabsList = null;
    this._panels = null;
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
    this._updateAriaAttributes();
    this._setDefaultActiveTab();
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this._activateTab(newValue);
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        __HOST_STYLE__
      </style>
      
      <slot></slot>
    `;
  }

  _setupEventListeners() {
    this.addEventListener('tabs-trigger-click', this._handleTabClick.bind(this));
  }

  _getTabsList() {
    return this.querySelector('__PREFIX__-__COMPONENT__-list');
  }

  _getTabsPanels() {
    return Array.from(this.querySelectorAll('__PREFIX__-__COMPONENT__-panel'));
  }

  _getTabsTriggers() {
    const tabsList = this._getTabsList();
    if (!tabsList) return [];
    return Array.from(tabsList.querySelectorAll('__PREFIX__-__COMPONENT__-trigger'));
  }

  _handleTabClick(event) {
    const trigger = event.target;
    const value = trigger.getAttribute('value');
    
    if (value) {
      this.setAttribute('value', value);
      this._activateTab(value);
    }
  }

  _activateTab(value) {
    const triggers = this._getTabsTriggers();
    const panels = this._getTabsPanels();

    // Update triggers
    triggers.forEach(trigger => {
      const triggerValue = trigger.getAttribute('value');
      if (triggerValue === value) {
        trigger.setAttribute('active', '');
        trigger.setAttribute('aria-selected', 'true');
      } else {
        trigger.removeAttribute('active');
        trigger.setAttribute('aria-selected', 'false');
      }
    });

    // Update panels
    panels.forEach(panel => {
      const panelValue = panel.getAttribute('value');
      if (panelValue === value) {
        panel.setAttribute('active', '');
        panel.setAttribute('aria-hidden', 'false');
      } else {
        panel.removeAttribute('active');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  _updateAriaAttributes() {
    this.setAttribute('role', 'tablist');
  }

  _setDefaultActiveTab() {
    const value = this.getAttribute('value');
    if (!value) {
      // If no value is set, activate first tab
      const triggers = this._getTabsTriggers();
      if (triggers.length > 0) {
        const firstValue = triggers[0].getAttribute('value');
        if (firstValue) {
          this.setAttribute('value', firstValue);
          this._activateTab(firstValue);
        }
      }
    } else {
      this._activateTab(value);
    }
  }

  // Public methods
  setActiveTab(value) {
    this.setAttribute('value', value);
  }

  getActiveTab() {
    return this.getAttribute('value');
  }

  getTabsCount() {
    return this._getTabsTriggers().length;
  }

  getTabsValues() {
    return this._getTabsTriggers().map(trigger => trigger.getAttribute('value'));
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Tabs);
