class Badge extends HTMLElement {
  static observedAttributes = ['value', 'max', 'variant'];

  constructor() {
    super();
  }

  connectedCallback() {
    this._updateDisplayValue();
  }

  attributeChangedCallback(name) {
    if (name === 'value' || name === 'max' || name === 'variant') {
      this._updateDisplayValue();
    }
  }

  _updateDisplayValue() {
    const value = this.getAttribute('value') || '0';
    const max = this.getAttribute('max');
    const variant = this.getAttribute('variant');

    if (variant === 'dot') {
      this.dataset.displayValue = '';
      return;
    }

    if (max && value !== '') {
      const numericValue = parseInt(value);
      const numericMax = parseInt(max);

      if (!isNaN(numericValue) && !isNaN(numericMax)) {
        this.dataset.displayValue =
          numericValue > numericMax ? `${numericMax}+` : value;
      } else {
        this.dataset.displayValue = value;
      }
    } else {
      this.dataset.displayValue = value;
    }

    this.dataset.value = value;
  }
}

customElements.define('capsule-badge', Badge);
