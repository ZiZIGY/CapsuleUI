class Autocomplete extends HTMLElement {
  constructor() {
    super();
    this._isOpen = false;
    this._input = null;
    this._options = [];
    this._value = null;
    this._onInput = this._onInput.bind(this);
    this._onOptionSelect = this._onOptionSelect.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
  }

  connectedCallback() {
    // Слушаем кастомные события от дочерних
    this.addEventListener('autocomplete-input', this._onInput);
    this.addEventListener('autocomplete-option-select', this._onOptionSelect);
    this.addEventListener('autocomplete-input-focus', this._onInputFocus);
    this.addEventListener('autocomplete-input-blur', this._onInputBlur);
  }

  disconnectedCallback() {
    this.removeEventListener('autocomplete-input', this._onInput);
    this.removeEventListener(
      'autocomplete-option-select',
      this._onOptionSelect
    );
    this.removeEventListener('autocomplete-input-focus', this._onInputFocus);
    this.removeEventListener('autocomplete-input-blur', this._onInputBlur);
  }

  _onInput(e) {
    this._isOpen = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  }

  _onInputFocus(e) {
    this._isOpen = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  }
  _onInputBlur(e) {
    setTimeout(() => {
      this._isOpen = false;
      this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    }, 120);
  }
  _onOptionSelect(e) {
    this._value = e.detail;
    this._isOpen = false;
    this.dispatchEvent(
      new CustomEvent('change', { detail: e.detail, bubbles: true })
    );
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
  }
}
customElements.define('capsule-autocomplete', Autocomplete);
