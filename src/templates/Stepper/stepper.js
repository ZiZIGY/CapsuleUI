class Stepper extends HTMLElement {
  static observedAttributes = ['current-step'];

  constructor() {
    super();
  }

  connectedCallback() {
    this._updateSteps();
  }

  attributeChangedCallback() {
    this._updateSteps();
  }

  _updateSteps() {
    const currentStep = parseInt(this.getAttribute('current-step')) || 1;

    const steps = this.querySelectorAll(`${this.tagName.toLowerCase()}-step`);
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      let status = 'inactive';

      if (stepNumber === currentStep) status = 'active';
      else if (stepNumber < currentStep) status = 'completed';

      step.setStatus(status);
    });

    const contents = this.querySelectorAll(
      `${this.tagName.toLowerCase()}-content`
    );
    contents.forEach((content, index) => {
      const stepNumber = index + 1;
      let status = 'inactive';

      if (stepNumber === currentStep) status = 'active';
      else if (stepNumber < currentStep) status = 'completed';

      content.setStatus(status);
    });
  }

  next() {
    const current = parseInt(this.getAttribute('current-step')) || 1;
    const steps = this.querySelectorAll(
      `${this.tagName.toLowerCase()}-step`
    ).length;
    if (current < steps) {
      this.setAttribute('current-step', current + 1);
    }
  }

  previous() {
    const current = parseInt(this.getAttribute('current-step')) || 1;
    if (current > 1) {
      this.setAttribute('current-step', current - 1);
    }
  }

  goToStep(step) {
    const steps = this.querySelectorAll(
      `${this.tagName.toLowerCase()}-step`
    ).length;
    if (step >= 1 && step <= steps) {
      this.setAttribute('current-step', step);
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Stepper);
