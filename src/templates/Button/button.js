import { buttonVariants } from './button.variants.js';

export class RippleButton extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._$rippleContainer = null;
    this._internals = this.attachInternals();
    this._isKeyPressed = false;

    this.attachShadow({ mode: 'open' });
    this._render();
    this._applyStyles();
  }

  connectedCallback() {
    this._internals.role = 'button';
    this._updateAriaDisabled();

    this._setupEventListeners();
    this._updateClassNames();

    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
    this._updateAriaDisabled();
  }

  get type() {
    return this.getAttribute('type') || 'button';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get form() {
    return this._internals.form;
  }

  click() {
    if (this.disabled) return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }

  static get observedAttributes() {
    return ['disabled', 'type', 'size', 'variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (['size', 'variant'].includes(name)) {
      this._updateClassNames();
    } else if (name === 'disabled') {
      this._updateAriaDisabled();
    }
  }

  _updateAriaDisabled() {
    this._internals.ariaDisabled = this.disabled;
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
      this.removeAttribute('tabindex');
    } else {
      this.removeAttribute('aria-disabled');
      this.tabIndex = 0;
    }
  }

  _updateClassNames() {
    const size = this.getAttribute('size') || buttonVariants.default.size;
    const variant =
      this.getAttribute('variant') || buttonVariants.default.variant;
    const baseClass = buttonVariants.base || '';
    const sizeClass = buttonVariants.size[size] || '';
    const variantClass = buttonVariants.variant[variant] || '';
    this.className = `${baseClass} ${sizeClass} ${variantClass}`.trim();
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
    style.textContent = `__STYLE__`;
    this.shadowRoot.appendChild(style);
  }

  _setupEventListeners() {
    this.addEventListener('pointerdown', this._createRipple.bind(this));
    this.addEventListener('pointerup', this._fadeRipple.bind(this));
    this.addEventListener('pointerleave', this._fadeRipple.bind(this));
    this.addEventListener('pointercancel', this._fadeRipple.bind(this));

    this.addEventListener('keydown', this._handleKeydown.bind(this));
    this.addEventListener('keyup', this._handleKeyup.bind(this));
    this.addEventListener('blur', this._handleBlur.bind(this));

    this.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this._handleFormSubmission();
  }

  _handleFormSubmission() {
    if (!this.form || this.type === 'button') return;
    if (this.type === 'reset') this.form.reset();
    if (this.type === 'submit') this.form.requestSubmit();
  }

  _handleKeydown(event) {
    if (this.disabled) return;

    if ((event.key === 'Enter' || event.key === ' ') && !this._isKeyPressed) {
      event.preventDefault();
      this._isKeyPressed = true;
      this._createRipple(event, true);
    }
  }

  _handleKeyup(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this._isKeyPressed = false;
      this._fadeRipple();

      this.click();
    }
  }

  _handleBlur() {
    this._isKeyPressed = false;
    this._fadeRipple();
  }

  _createRipple(event, isKeyboardEvent = false) {
    if (this.disabled) {
      return;
    }

    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const ripple = document.createElement('span');
    const radius = diameter / 2;
    const rect = this.getBoundingClientRect();

    ripple.classList.add('ripple', 'grow');

    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;

    ripple.style.width = ripple.style.height = `${diameter}px`;
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
