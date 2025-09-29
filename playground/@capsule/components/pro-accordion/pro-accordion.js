class Accordion extends HTMLElement {
  constructor() {
    super();
    this._render();
    this.attachShadow({ mode: 'open' });
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

  _render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
  }

  _setupEventListeners() {
    this.addEventListener(
      'accordion-item-toggle',
      this._handleItemToggle.bind(this)
    );
  }

  _getItems() {
    return Array.from(this.querySelectorAll('pro-accordion-item'));
  }

  _handleItemToggle(event) {
    const item = event.target;
    const isOpen = item.hasAttribute('open');
    const type = this.getAttribute('type') || 'single';
    const collapsible = this.hasAttribute('collapsible');

    if (type === 'single') {
      const items = this._getItems();

      items.forEach((otherItem) => {
        if (otherItem !== item && otherItem.hasAttribute('open')) {
          otherItem.removeAttribute('open');
        }
      });

      if (isOpen && !collapsible) {
        return;
      }
      item.toggleAttribute('open');
    } else if (type === 'multiple') {
      item.toggleAttribute('open');
    }
  }

  _handleTypeChange() {
    const type = this.getAttribute('type') || 'single';
    if (type === 'single') {
      const items = this._getItems();
      const openItems = items.filter((item) => item.hasAttribute('open'));
      if (openItems.length > 1) {
        openItems.slice(1).forEach((item) => {
          item.removeAttribute('open');
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
    const items = this._getItems();

    if (!collapsible && type === 'single' && items.length > 0) {
      const hasAnyOpenItem = items.some((item) => item.hasAttribute('open'));

      if (!hasAnyOpenItem) {
        const firstItem = items[0];
        firstItem.setAttribute('open', '');
      }
    }
  }

  openItem(index) {
    const items = this._getItems();
    const item = items[index];
    if (item) {
      item.setAttribute('open', '');
    }
  }

  closeItem(index) {
    const items = this._getItems();
    const item = items[index];
    if (item) {
      item.removeAttribute('open');
    }
  }

  toggleItem(index) {
    const items = this._getItems();
    const item = items[index];
    if (item) {
      item.toggleAttribute('open');
    }
  }

  openAll() {
    const items = this._getItems();
    items.forEach((item) => {
      item.setAttribute('open', '');
    });
  }

  closeAll() {
    const items = this._getItems();
    items.forEach((item) => {
      item.removeAttribute('open');
    });
  }

  getItemCount() {
    return this._getItems().length;
  }

  getOpenItems() {
    return this._getItems().filter((item) => item.hasAttribute('open'));
  }
}

customElements.define('pro-accordion', Accordion);
