class AlertTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '2');
  }
}

customElements.define('capsule-alert-title', AlertTitle);
