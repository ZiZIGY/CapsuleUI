class FormMessage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = 'none';
  }

  setMessage(message) {
    this.textContent = message;
    this.style.display = 'block';
  }

  clearMessage() {
    this.textContent = '';
    this.style.display = 'none';
  }
}

customElements.define('form-message', FormMessage);
