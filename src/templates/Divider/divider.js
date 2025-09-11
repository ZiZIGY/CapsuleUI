export class Divider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
    this._applyHostStyles();
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

  _render() {
    this.shadowRoot.innerHTML = `
      <div class="divider"></div>
    `;
  }

  _applyHostStyles() {
    const style = document.createElement('style');
    style.textContent = `__HOST_STYLE__`;
    this.shadowRoot.appendChild(style);
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
