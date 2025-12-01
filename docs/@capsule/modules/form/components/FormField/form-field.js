class FormField extends HTMLElement {
  constructor() {
    super();
  }

  setError(message, selector = 'form-message') {
    const messageElement = this.querySelector(selector);
    if (messageElement) {
      if (message) {
        if (typeof messageElement.setMessage === 'function') {
          messageElement.setMessage(message);
        } else {
          messageElement.textContent = message;
          messageElement.style.display = 'block';
        }
        this.classList.add('error');
      } else {
        if (typeof messageElement.clearMessage === 'function') {
          messageElement.clearMessage();
        } else {
          messageElement.textContent = '';
          messageElement.style.display = 'none';
        }
        this.classList.remove('error');
      }
    }
  }
}
customElements.define('form-field', FormField);
