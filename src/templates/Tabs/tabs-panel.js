class TabsPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
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
      <style>
        __HOST_STYLE__
      </style>
      
      <div part="panel">
        <slot></slot>
      </div>
    `;
  }

  _updateAriaAttributes() {
    const isActive = this.hasAttribute('active');
    const value = this.getAttribute('value');
    
    this.setAttribute('role', 'tabpanel');
    this.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    
    if (value) {
      this.setAttribute('id', `tabs-panel-${value}`);
      this.setAttribute('aria-labelledby', `tabs-trigger-${value}`);
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__-panel', TabsPanel);
