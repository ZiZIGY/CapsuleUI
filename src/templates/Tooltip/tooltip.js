class Tooltip extends HTMLElement {
  constructor() {
    super();
    
    this._tooltip = null;
    this._trigger = null;
    
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._updateAriaAttributes();
  }

  disconnectedCallback() {
    this._cleanup();
  }

  static get observedAttributes() {
    return [, 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this._updateAriaAttributes();
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        __HOST_STYLE__
      </style>
      
      <slot></slot>
      <div part="tooltip" role="tooltip">
        <slot name="content"></slot>
      </div>
    `;
  
    this._tooltip = this.shadowRoot.querySelector('.tooltip');
    this._trigger = this.shadowRoot.querySelector('slot[name="trigger"]');
  }

  _updateAriaAttributes() {
    if (this.hasAttribute('disabled')) {
      this.removeAttribute('aria-describedby');
    } else {
      this.setAttribute('aria-describedby', 'tooltip-content');
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Tooltip);
