class AutocompleteInput extends HTMLElement {
  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  connectedCallback() {
    const input = this.querySelector('input, textarea, [data-autocomplete-input], [contenteditable]');
    if (input) {
      input.addEventListener('input', this._onInput);
      input.addEventListener('focus', this._onFocus);
      input.addEventListener('blur', this._onBlur);
    }
  }

  disconnectedCallback() {
    const input = this.querySelector('input, textarea,[data-autocomplete-input],[contenteditable]');
    if (input) {
      input.removeEventListener('input', this._onInput);
      input.removeEventListener('focus', this._onFocus);
      input.removeEventListener('blur', this._onBlur);
    }
  }

  _onInput(e) {
    this.dispatchEvent(new CustomEvent('autocomplete-input', { detail: e.target.value, bubbles: true }));
  }
  _onFocus() {
    this.dispatchEvent(new CustomEvent('autocomplete-input-focus', { bubbles: true }));
  }
  _onBlur() {
    this.dispatchEvent(new CustomEvent('autocomplete-input-blur', { bubbles: true }));
  }
}
customElements.define('__PREFIX__-__COMPONENT__-input', AutocompleteInput);
