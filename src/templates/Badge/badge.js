import { LitElement, html } from '../../lit';

class CapsuleBadge extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    max: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.value = '0';
    this.max = '';
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('value') || changedProperties.has('max')) {
      this._updateDisplayValue();
    }
  }

  _updateDisplayValue() {
    let displayValue = this.value || '0';

    if (this.max && this.value !== '') {
      const numericValue = parseInt(this.value);
      const numericMax = parseInt(this.max);

      if (!isNaN(numericValue) && !isNaN(numericMax)) {
        displayValue =
          numericValue > numericMax ? `${numericMax}+` : this.value.toString();
      }
    }

    this.dataset.value = displayValue;
  }

  render() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this._updateDisplayValue();
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleBadge);
