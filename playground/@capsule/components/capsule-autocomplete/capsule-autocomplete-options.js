class AutocompleteOptions extends HTMLElement {
  constructor() {
    super();
    this._open = false;
    this._onParentOpen = this._onParentOpen.bind(this);
    this._onParentClose = this._onParentClose.bind(this);
  }

  connectedCallback() {
    this._render();
    this.addEventListener('open', this._onParentOpen);
    this.addEventListener('close', this._onParentClose);
  }
  disconnectedCallback() {
    this.removeEventListener('open', this._onParentOpen);
    this.removeEventListener('close', this._onParentClose);
  }
  _onParentOpen() {
    this._open = true;
    this._render();
  }
  _onParentClose() {
    this._open = false;
    this._render();
  }
  _render() {
    this.style.display = this._open ? '' : 'none';
  }
}
customElements.define('capsule-autocomplete-options', AutocompleteOptions);
