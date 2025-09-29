class FormField extends HTMLElement {
  constructor() {
    super();
  }

  setError(message) {
    const messageElement = this.querySelector('form-message');
    if (messageElement) {
      if (message) {
        messageElement.setMessage(message);
        this.classList.add('invalid');
      } else {
        messageElement.clearMessage();
        this.classList.remove('invalid');
      }
    }
  }
}

customElements.define('form-field', FormField);
