class TabsTrigger extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
    this._updateAriaAttributes();
  }

  static get observedAttributes() {
    return ['value', 'active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this._updateAriaAttributes();
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <slot part="trigger"></slot>
    `;
  }

  _setupEventListeners() {
    const button = this.shadowRoot.querySelector('[part="trigger"]');
    button.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event) {
    event.preventDefault();
    
    const customEvent = new CustomEvent('tabs-trigger-click', {
      bubbles: true,
      detail: { trigger: this }
    });
    this.dispatchEvent(customEvent);
  }

  _updateAriaAttributes() {
    const isActive = this.hasAttribute('active');
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', isActive ? 'true' : 'false');
    
    const value = this.getAttribute('value');
    if (value) {
      this.setAttribute('aria-controls', `tabs-panel-${value}`);
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__-trigger', TabsTrigger);
