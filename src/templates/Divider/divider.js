class Divider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.setAttribute('role', 'separator');
    this._updateAriaOrientation();
    
    if (!this.hasAttribute('orientation')) {
      this.setAttribute('orientation', 'horizontal');
    }
  }

  static get observedAttributes() {
    return ['orientation'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'orientation') {
      this._updateAriaOrientation();
    }
  }

  _updateAriaOrientation() {
    const orientation = this.getAttribute('orientation') || 'horizontal';
    this.setAttribute('aria-orientation', orientation);
  }

  get orientation() {
    return this.getAttribute('orientation') || 'horizontal';
  }

  set orientation(value) {
    this.setAttribute('orientation', value);
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Divider);
