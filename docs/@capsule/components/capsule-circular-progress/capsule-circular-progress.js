import { LitElement, html } from '../../lit';

class CapsuleCircularProgress extends LitElement {
  static properties = {
    value: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
    size: { type: String, reflect: true },
    color: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.size = 'md';
    this.color = 'primary';
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
    this._updateProgress();
  }

  updated(changedProperties) {
    if (changedProperties.has('value') || changedProperties.has('max')) {
      this._updateProgress();
    }
  }

  firstUpdated() {
    this._updateProgress();
  }

  render() {
    return html`
      <svg
        class="circular-progress-svg"
        viewBox="22 22 44 44"
        part="svg"
      >
        <circle
          class="circular-progress-circle-bg"
          part="circle-bg"
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke-width="3.6"
        ></circle>
        <circle
          class="circular-progress-circle"
          part="circle"
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke-width="3.6"
        ></circle>
      </svg>
    `;
  }

  _calculatePercentage() {
    const max = Number(this.max) || 100;
    if (!max || max === 0) return 0;
    const value = Number(this.value) || 0;
    const percentage = (value / max) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  _updateProgress() {
    const percentage = this._calculatePercentage();
    const value = Number(this.value) || 0;
    const max = Number(this.max) || 100;
    const circumference = 2 * Math.PI * 20.2;
    const offset = circumference - (percentage / 100) * circumference;

    this.setAttribute('aria-valuenow', value);
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', max);
    this.setAttribute('aria-label', `Progress: ${percentage.toFixed(0)}%`);

    // Set value attribute for CSS content: attr(value) usage
    this.setAttribute('data-value', value);
    this.setAttribute('data-percentage', percentage.toFixed(0));

    // Set CSS variables for smooth CSS animation
    this.style.setProperty('--progress-offset', `${offset}px`);
    this.style.setProperty('--progress-circumference', `${circumference}px`);
  }
}

customElements.define('capsule-circular-progress', CapsuleCircularProgress);
