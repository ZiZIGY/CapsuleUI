class Badge extends HTMLElement {
  static observedAttributes = ['value', 'max'];

  constructor() {
    super();
  }

  connectedCallback() {
    this._updateDisplayValue();
  }

  attributeChangedCallback(name) {
    if (name === 'value' || name === 'max') {
      this._updateDisplayValue();
    }
  }

  _updateDisplayValue() {
    const value = this.getAttribute('value') || '0';
    const max = this.getAttribute('max');

    let displayValue = value;

    if (max && value !== '') {
      const numericValue = parseInt(value);
      const numericMax = parseInt(max);

      if (!isNaN(numericValue) && !isNaN(numericMax)) {
        displayValue =
          numericValue > numericMax ? `${numericMax}+` : value.toString();
      }
    }

    // Устанавливаем data-value который используется в CSS
    this.dataset.value = displayValue;
  }
}

customElements.define('capsule-badge', Badge);
