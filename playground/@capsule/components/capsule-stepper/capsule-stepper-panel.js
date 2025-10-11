class StepperPanel extends HTMLElement {
  constructor() {
    super();
  }

  setStatus(status) {
    this.setAttribute('status', status);
  }
}

customElements.define('capsule-stepper-panel', StepperPanel);
