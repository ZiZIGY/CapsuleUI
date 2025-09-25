class Button extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._isKeyPressed = false;
  }

  connectedCallback() {
    this._internals.role = 'button';
    this._updateAriaDisabled();

    this._setupEventListeners();

    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
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
    return ['disabled', 'type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this._updateAriaDisabled();
    }
  }

  _updateAriaDisabled() {
    this._internals.ariaDisabled = this.disabled;
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  _setupEventListeners() {
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
    if (!this.form || this.type === 'button' || this.type === 'image') return;
    if (this.type === 'reset') this.form.reset();
    if (this.type === 'submit') this.form.requestSubmit();
  }

  _handleKeydown(event) {
    if (this.disabled || event.repeat) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.click();
    }
  }

  _handleKeyup(event) {
    if (this.disabled) return;
    if (event.key === 'Enter') {
      this.click();
    }
  }

  _handleBlur() {
    this._isKeyPressed = false;
  }
}

customElements.define('capsule-button', Button);
