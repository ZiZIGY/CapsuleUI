class StepperStep extends HTMLElement {
  constructor() {
    super();
  }

  setStatus(status) {
    this.setAttribute('status', status);
  }
}

customElements.define('capsule-stepper-step', StepperStep);
