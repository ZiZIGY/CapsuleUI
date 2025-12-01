import { LitElement, html } from '../../lit';

class CapsuleProgress extends LitElement {
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

  updated(changedProperties) {
    if (changedProperties.has('value') || changedProperties.has('max')) {
      this._updateProgress();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
  }

  firstUpdated() {
    this._updateProgress();
  }

  render() {
    return html`
      <div class="progress-bar" part="bar"></div>
    `;
  }

  _calculatePercentage() {
    if (!this.max || this.max === 0) return 0;
    const percentage = (this.value / this.max) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  _updateProgress() {
    const percentage = this._calculatePercentage();
    this.setAttribute('aria-valuenow', this.value);
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', this.max);
    this.setAttribute('aria-label', `Progress: ${percentage.toFixed(0)}%`);
    
    // Обновляем CSS переменную для ширины
    this.style.setProperty('--progress', `${percentage}%`);
  }
}

customElements.define('capsule-progress', CapsuleProgress);
