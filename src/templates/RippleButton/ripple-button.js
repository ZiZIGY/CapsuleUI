import { rippleButtonVariants } from './ripple-button.variants.js';

export class RippleButton extends HTMLElement {
  constructor() {
    super();
    this._$rippleContainer = null;
    this.attachShadow({ mode: 'open' });
    this._render();
    this._applyStyles();
  }

  connectedCallback() {
    this._setupEventListeners();
    this._updateClassNames();
    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }
  }

  static get observedAttributes() {
    return ['disabled', 'type', 'size', 'variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (['size', 'variant'].includes(name)) {
      this._updateClassNames();
    }
  }

  _updateClassNames() {
    const size = this.getAttribute('size') || rippleButtonVariants.default.size;
    const variant =
      this.getAttribute('variant') || rippleButtonVariants.default.variant;
    const sizeClass = rippleButtonVariants.size[size] || '';
    const variantClass = rippleButtonVariants.variant[variant] || '';
    this.className = `${sizeClass} ${variantClass}`;
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
      <div class="ripple-container"></div>
    `;
    this._$rippleContainer = this.shadowRoot.querySelector('.ripple-container');
  }

  _applyStyles() {
    const style = document.createElement('style');
    style.textContent = ``;
    this.shadowRoot.appendChild(style);
  }

  _setupEventListeners() {
    this.addEventListener('pointerdown', this._createRipple.bind(this));
    this.addEventListener('pointerup', this._fadeRipple.bind(this));
    this.addEventListener('pointerleave', this._fadeRipple.bind(this));
    this.addEventListener('pointercancel', this._fadeRipple.bind(this));
  }

  _createRipple(event) {
    if (this.hasAttribute('disabled')) {
      return;
    }
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple', 'grow');
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    this._$rippleContainer.appendChild(ripple);
  }

  _fadeRipple() {
    const ripple = this._$rippleContainer.querySelector('.ripple:last-child');
    if (ripple) {
      ripple.classList.add('fade');
      ripple.addEventListener('transitionend', () => ripple.remove(), {
        once: true,
      });
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__', RippleButton);
