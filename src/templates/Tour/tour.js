import { LitElement, html } from '../../lit';

class CapsuleTour extends LitElement {
  static properties = {
    value: { type: Number, reflect: true },
  };

  constructor() {
    super();
    this.value = null;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateTour();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._updateTour();
    }
  }

  firstUpdated() {
    this._updateTour();
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  render() {
    return html`<slot></slot>`;
  }

  _getSteps() {
    return Array.from(this.querySelectorAll('__PREFIX__-__COMPONENT__-step'));
  }

  _updateTour() {
    const steps = this._getSteps();
    const stepNumber = Number(this.value);
    const totalSteps = steps.length;

    // Hide all steps
    steps.forEach((step) => {
      step.setAttribute('hidden', '');
    });

    // Hide tour if no valid step
    if (
      !this.value ||
      this.value === null ||
      this.value === undefined ||
      this.value === '' ||
      isNaN(stepNumber) ||
      stepNumber < 1 ||
      stepNumber > totalSteps
    ) {
      this.setAttribute('hidden', '');
      return;
    }

    // Show tour and current step
    this.removeAttribute('hidden');
    const currentStep = steps[stepNumber - 1];
    if (currentStep) {
      currentStep.removeAttribute('hidden');
    }
  }

  // Public API
  next() {
    const steps = this._getSteps();
    if (!this.value || this.value >= steps.length) {
      return false;
    }
    this.value = Number(this.value) + 1;
    return true;
  }

  prev() {
    if (!this.value || this.value <= 1) {
      return false;
    }
    this.value = Number(this.value) - 1;
    return true;
  }

  skip() {
    this.value = null;
    this.setAttribute('hidden', '');
  }

  goToStep(stepNumber) {
    const steps = this._getSteps();
    if (stepNumber >= 1 && stepNumber <= steps.length) {
      this.value = stepNumber;
      return true;
    }
    return false;
  }

  start() {
    const steps = this._getSteps();
    if (steps.length > 0) {
      this.value = 1;
      return true;
    }
    return false;
  }

  getCurrentStep() {
    return this.value;
  }

  getTotalSteps() {
    return this._getSteps().length;
  }

  isActive() {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleTour);
