class ButtonGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'group');
  }
}

customElements.define('capsule-button-group', ButtonGroup);
