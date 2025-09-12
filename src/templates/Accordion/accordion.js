class Accordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
    this._updateAriaAttributes();
    this._setDefaultOpenState();
  }

  disconnectedCallback() {
    this._cleanup();
  }

  static get observedAttributes() {
    return ['type', 'collapsible'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      this._handleTypeChange();
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
    // Listen for accordion item events
    this.addEventListener('accordion-item-toggle', this._handleItemToggle.bind(this));
  }

  _cleanup() {
    // No cleanup needed since we don't store references
  }

  // Dynamic method to get current items
  _getItems() {
    return Array.from(this.querySelectorAll('__PREFIX__-__COMPONENT__-item'));
  }

  _handleItemToggle(event) {
    const item = event.target;
    const isOpen = item.hasAttribute('open');
    const type = this.getAttribute('type') || 'single';
    const collapsible = this.hasAttribute('collapsible');

    if (type === 'single') {
      // Get current items dynamically
      const items = this._getItems();
      
      // Close all other items
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.hasAttribute('open')) {
          otherItem.removeAttribute('open');
          otherItem._hideContent();
        }
      });
      
      // Toggle current item
      if (isOpen && !collapsible) {
        // Don't close if not collapsible
        return;
      }
      item.toggleAttribute('open');
      if (item.hasAttribute('open')) {
        item._showContent();
      } else {
        item._hideContent();
      }
    } else if (type === 'multiple') {
      // Multiple mode - just toggle the current item
      item.toggleAttribute('open');
      if (item.hasAttribute('open')) {
        item._showContent();
      } else {
        item._hideContent();
      }
    }
  }

  _handleTypeChange() {
    // If switching from multiple to single, close all but first
    const type = this.getAttribute('type') || 'single';
    if (type === 'single') {
      const items = this._getItems();
      const openItems = items.filter(item => item.hasAttribute('open'));
      if (openItems.length > 1) {
        openItems.slice(1).forEach(item => {
          item.removeAttribute('open');
          item._hideContent();
        });
      }
      // Ensure first item is open if not collapsible
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
    const items = this._getItems();

    // If not collapsible and single mode, open first item by default
    // BUT only if no other item has 'open' attribute
    if (!collapsible && type === 'single' && items.length > 0) {
      const hasAnyOpenItem = items.some(item => item.hasAttribute('open'));
      
      if (!hasAnyOpenItem) {
        const firstItem = items[0];
        firstItem.setAttribute('open', '');
        firstItem._showContent();
      }
    }
  }

  // Public methods - now use dynamic item finding
  openItem(index) {
    const items = this._getItems();
    const item = items[index];
    if (item) {
      item.setAttribute('open', '');
      item._showContent();
    }
  }

  closeItem(index) {
    const items = this._getItems();
    const item = items[index];
    if (item) {
      item.removeAttribute('open');
      item._hideContent();
    }
  }

  toggleItem(index) {
    const items = this._getItems();
    const item = items[index];
    if (item) {
      item.toggleAttribute('open');
      if (item.hasAttribute('open')) {
        item._showContent();
      } else {
        item._hideContent();
      }
    }
  }

  openAll() {
    const items = this._getItems();
    items.forEach(item => {
      item.setAttribute('open', '');
      item._showContent();
    });
  }

  closeAll() {
    const items = this._getItems();
    items.forEach(item => {
      item.removeAttribute('open');
      item._hideContent();
    });
  }

  getItemCount() {
    return this._getItems().length;
  }

  getOpenItems() {
    return this._getItems().filter(item => item.hasAttribute('open'));
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Accordion);
