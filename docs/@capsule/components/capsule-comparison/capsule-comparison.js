import { LitElement, html } from '../../lit';

class CapsuleComparison extends LitElement {
  static properties = {
    position: { type: Number, reflect: true },
  };

  constructor() {
    super();
    this.position = 50;
    this._handleLineMove = this._handleLineMove.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('comparison-line-move', this._handleLineMove);
    this._updatePosition();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('comparison-line-move', this._handleLineMove);
  }

  updated(changedProperties) {
    if (changedProperties.has('position')) {
      this._updatePosition();
    }
  }

  firstUpdated() {
    this._updatePosition();
    this._updateLineAria();
  }

  render() {
    return html`<slot></slot>`;
  }

  _handleLineMove(event) {
    this.position = event.detail.position;
    this._updatePosition();
    this._updateLineAria();
  }

  _updatePosition() {
    const position = Math.max(0, Math.min(100, Number(this.position) || 50));
    this.style.setProperty('--comparison-position', `${position}%`);
  }

  _updateLineAria() {
    const line = this.querySelector('capsule-comparison-line');
    if (line) {
      const position = Number(this.position) || 50;
      line.setAttribute('aria-valuenow', position.toFixed(0));
    }
  }

  setPosition(position) {
    this.position = Math.max(0, Math.min(100, Number(position) || 50));
    this._updatePosition();
    this._updateLineAria();
  }
}

customElements.define('capsule-comparison', CapsuleComparison);

