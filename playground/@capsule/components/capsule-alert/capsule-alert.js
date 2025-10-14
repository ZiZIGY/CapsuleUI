class Alert extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'alert');
  }
}

customElements.define('capsule-alert', Alert);
