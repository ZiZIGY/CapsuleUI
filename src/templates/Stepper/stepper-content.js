class StepperContent extends HTMLElement {
  constructor() {
    super();
  }

  setStatus(status) {
    this.setAttribute('status', status);
  }
}

customElements.define('__PREFIX__-__COMPONENT__-content', StepperContent);
