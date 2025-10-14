class ButtonGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'group');
  }
}

customElements.define('__PREFIX__-__COMPONENT__', ButtonGroup);
