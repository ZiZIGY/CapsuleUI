import { LitElement, html } from '../../lit';

class CapsuleTabs extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._handleTabClick = this._handleTabClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.addEventListener('tabs-trigger-click', this._handleTabClick);
    this._setDefaultActiveTab();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tabs-trigger-click', this._handleTabClick);
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._activateTab(this.value);
    }
  }

  firstUpdated() {
    this._setDefaultActiveTab();
  }

  render() {
    return html`<slot></slot>`;
  }

  _getTabsList() {
    return this.querySelector('capsule-tabs-list');
  }

  _getTabsPanels() {
    const panelsContainer = this.querySelector(
      'capsule-tabs-panels'
    );
    if (!panelsContainer) return [];
    return Array.from(
      panelsContainer.querySelectorAll('capsule-tabs-panel')
    );
  }

  _getTabsTriggers() {
    const tabsList = this._getTabsList();
    if (!tabsList) return [];
    return Array.from(
      tabsList.querySelectorAll('capsule-tabs-trigger')
    );
  }

  _handleTabClick(event) {
    const trigger = event.detail?.trigger || event.target;
    const value = trigger.getAttribute('value');

    if (value) {
      this.value = value;
      this._activateTab(value);
    }
  }

  _activateTab(value) {
    if (!value) return;

    const triggers = this._getTabsTriggers();
    const panels = this._getTabsPanels();

    // Update triggers
    triggers.forEach((trigger) => {
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
    panels.forEach((panel) => {
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

  _setDefaultActiveTab() {
    if (!this.value) {
      // If no value is set, activate first tab
      const triggers = this._getTabsTriggers();
      if (triggers.length > 0) {
        const firstValue = triggers[0].getAttribute('value');
        if (firstValue) {
          this.value = firstValue;
          this._activateTab(firstValue);
        }
      }
    } else {
      this._activateTab(this.value);
    }
  }

  // Public methods
  setActiveTab(value) {
    this.value = value;
  }

  getActiveTab() {
    return this.value;
  }

  getTabsCount() {
    return this._getTabsTriggers().length;
  }

  getTabsValues() {
    return this._getTabsTriggers().map((trigger) =>
      trigger.getAttribute('value')
    );
  }
}

customElements.define('capsule-tabs', CapsuleTabs);
