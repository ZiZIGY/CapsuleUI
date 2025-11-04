import { LitElement, html } from '../../lit';

class Switch extends LitElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._checked = this.hasAttribute('checked');

    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._init();
  }

  updated(changedProperties) {
    if (changedProperties.has('checked')) {
      const wasChecked = changedProperties.get('checked');
      if (wasChecked !== this._checked) {
        this._updateVisualState();
        this._updateFormValue();
      }
    }

    if (changedProperties.has('disabled')) {
      this._updateVisualState();
    }
  }

  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }

  formResetCallback() {
    const defaultChecked = this.hasAttribute('checked');
    if (this._checked !== defaultChecked) {
      this._checked = defaultChecked;
      this._updateVisualState();
      this._updateFormValue();
    }
  }

  _init() {
    this._bindEvents();
    this._updateVisualState();
    this._updateFormValue();
  }

  _bindEvents() {
    this.addEventListener('click', this._onClick);
    this.addEventListener('keydown', this._onKeyDown);
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'switch');
  }

  _onClick(e) {
    if (this.disabled) return;
    e.stopPropagation();
    this.toggle();
  }

  _onKeyDown(e) {
    if (this.disabled) return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      this.toggle();
    }
  }

  _updateVisualState() {
    this.setAttribute('aria-checked', this._checked.toString());

    if (this._checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }

    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  _updateFormValue() {
    this._internals.setFormValue(this._checked ? 'true' : 'false');
  }

  toggle() {
    this._checked = !this._checked;
    this._updateVisualState();
    this._updateFormValue();

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this._checked },
        bubbles: true,
      })
    );
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    const newValue = Boolean(value);
    if (this._checked !== newValue) {
      this._checked = newValue;
      this._updateVisualState();
      this._updateFormValue();
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', value);
  }

  get size() {
    return this.getAttribute('size');
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  render() {
    return html`
      <div part="thumb">
        <slot></slot>
      </div>
    `;
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }
}

customElements.define('capsule-switch', Switch);
