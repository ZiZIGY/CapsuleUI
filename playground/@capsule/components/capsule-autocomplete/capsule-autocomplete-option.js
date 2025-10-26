class AutocompleteOption extends HTMLElement {
  constructor() {
    super();
    this.value = '';
    this._onClick = this.#onClick.bind(this);
  }

  connectedCallback() {
    if (this.hasAttribute('value')) {
      this.value = this.getAttribute('value');
    }
    this.addEventListener('mousedown', this.#onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this.#onClick);
  }

  #onClick(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('autocomplete-option-select', {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}

customElements.define('capsule-autocomplete-option', AutocompleteOption);
