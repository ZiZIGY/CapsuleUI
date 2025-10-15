class AutocompleteOption extends HTMLElement {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  connectedCallback() {
    this.addEventListener('mousedown', this._onClick);
  }
  disconnectedCallback() {
    this.removeEventListener('mousedown', this._onClick);
  }
  _onClick(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('autocomplete-option-select', {
        detail: this.value,
        bubbles: true,
      })
    );
  }
  get value() {
    return this.getAttribute('value');
  }
  set value(val) {
    this.setAttribute('value', val);
  }
}
customElements.define('__PREFIX__-__COMPONENT__-option', AutocompleteOption);
