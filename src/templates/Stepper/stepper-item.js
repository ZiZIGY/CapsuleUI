class StepperItem extends HTMLElement {
  constructor() {
    super();
  }

  setStatus(status) {
    this.setAttribute('status', status);
  }
}

customElements.define('__PREFIX__-__COMPONENT__-item', StepperItem);
