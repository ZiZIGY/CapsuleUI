class Stepper extends HTMLElement {
  static observedAttributes = ['current-step'];

  constructor() {
    super();
  }

  connectedCallback() {
    this._updateSteps();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'current-step' && oldValue !== newValue) {
      this._updateSteps();
      this._triggerChangeEvent();
    }
  }

  get currentStep() {
    return parseInt(this.getAttribute('current-step')) || 1;
  }

  get totalSteps() {
    return this.querySelectorAll(`${this.tagName.toLowerCase()}-step`).length;
  }

  get status() {
    return {
      current: this.currentStep,
      total: this.totalSteps,
      isFirst: this.currentStep === 1,
      isLast: this.currentStep === this.totalSteps,
      progress: (this.currentStep / this.totalSteps) * 100,
    };
  }

  _updateSteps() {
    const currentStep = this.currentStep;

    const steps = this.querySelectorAll(`${this.tagName.toLowerCase()}-step`);
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      let status = 'inactive';

      if (stepNumber === currentStep) status = 'active';
      else if (stepNumber < currentStep) status = 'completed';

      if (step.setStatus) {
        step.setStatus(status);
      }
    });

    const panels = this.querySelectorAll(`${this.tagName.toLowerCase()}-panel`);
    panels.forEach((panel, index) => {
      const stepNumber = index + 1;
      const status = stepNumber === currentStep ? 'active' : 'inactive';

      if (panel.setStatus) {
        panel.setStatus(status);
      }
    });
  }

  _triggerChangeEvent() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });

    event.detail = this.status;
    this.dispatchEvent(event);
  }

  next() {
    if (this.currentStep < this.totalSteps) {
      this.setAttribute('current-step', this.currentStep + 1);
      return true;
    }
    return false;
  }

  previous() {
    if (this.currentStep > 1) {
      this.setAttribute('current-step', this.currentStep - 1);
      return true;
    }
    return false;
  }

  setStep(step) {
    this.setAttribute('current-step', step);
  }

  first() {
    this.setAttribute('current-step', 1);
  }

  last() {
    this.setAttribute('current-step', this.totalSteps);
  }

  reset() {
    this.setAttribute('current-step', 1);
  }

  canGoNext() {
    return this.currentStep < this.totalSteps;
  }

  canGoPrevious() {
    return this.currentStep > 1;
  }
}

customElements.define('capsule-stepper', Stepper);
