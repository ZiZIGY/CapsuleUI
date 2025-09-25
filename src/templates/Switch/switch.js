class Switch extends HTMLElement {
  static observedAttributes = ['checked', 'disabled', 'size'];
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals_ = this.attachInternals();
    this._checked = this.hasAttribute('checked');

    this._render();
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    this._init();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'checked') {
      // Избегаем рекурсии - обновляем только если значение изменилось
      const wasChecked = this._checked;
      this._checked = newValue !== null;

      if (wasChecked !== this._checked) {
        this._updateVisualState();
        this._updateFormValue();
      }
    } else if (name === 'disabled') {
      this._updateVisualState();
    }
  }

  formDisabledCallback(disabled) {
    this.toggleAttribute('disabled', disabled);
  }

  formResetCallback() {
    const defaultChecked = this.hasAttribute('checked');
    if (this._checked !== defaultChecked) {
      this._checked = defaultChecked;
      this._updateVisualState();
      this._updateFormValue();
    }
  }

  // Private methods
  _render() {
    this.shadowRoot.innerHTML = `
      <div part="track">
        <div part="thumb">
          <slot></slot>
          <div part="surface"></div>
          <capsule-ripple part="ripples"></capsule-ripple>
        </div>
      </div>
    `;
  }

  _init() {
    this._track = this.shadowRoot.querySelector('[part="track"]');
    this._thumb = this.shadowRoot.querySelector('[part="thumb"]');

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
    // Используем boolean значения вместо 'on'
    this.internals_.setFormValue(this._checked ? 'true' : 'false');
  }

  // Public methods
  toggle() {
    // Избегаем рекурсии - меняем внутреннее состояние напрямую
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

  // Getters/setters
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
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Switch);
