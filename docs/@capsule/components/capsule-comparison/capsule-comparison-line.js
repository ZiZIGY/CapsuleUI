import { LitElement, html } from '../../lit';

class CapsuleComparisonLine extends LitElement {
  constructor() {
    super();
    this._isDragging = false;
    this._handlePointerDown = this._handlePointerDown.bind(this);
    this._handlePointerMove = this._handlePointerMove.bind(this);
    this._handlePointerUp = this._handlePointerUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('pointerdown', this._handlePointerDown);
    this.addEventListener('keydown', this._handleKeyDown);
    this.setAttribute('role', 'slider');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', 'Adjust comparison position');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this._handlePointerDown);
    this.removeEventListener('keydown', this._handleKeyDown);
    this._removeGlobalListeners();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div
        class="line"
        part="line"
      >
        <slot></slot>
      </div>
    `;
  }

  _handlePointerDown(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    this._isDragging = true;
    this.setPointerCapture(event.pointerId);
    this.setAttribute('aria-pressed', 'true');
    document.addEventListener('pointermove', this._handlePointerMove);
    document.addEventListener('pointerup', this._handlePointerUp);
    this._updatePosition(event);
  }

  _handlePointerMove(event) {
    if (!this._isDragging) return;
    event.preventDefault();
    this._updatePosition(event);
  }

  _handlePointerUp(event) {
    if (!this._isDragging) return;
    this._isDragging = false;
    this.removeAttribute('aria-pressed');
    this.releasePointerCapture(event.pointerId);
    this._removeGlobalListeners();
  }

  _removeGlobalListeners() {
    document.removeEventListener('pointermove', this._handlePointerMove);
    document.removeEventListener('pointerup', this._handlePointerUp);
  }

  _updatePosition(event) {
    const container = this.closest('capsule-comparison');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const position = (x / containerRect.width) * 100;
    const clampedPosition = Math.max(0, Math.min(100, position));

    container.setPosition(clampedPosition);
    this.setAttribute('aria-valuenow', Number(clampedPosition).toFixed(0));

    this.dispatchEvent(
      new CustomEvent('comparison-line-move', {
        bubbles: true,
        detail: { position: clampedPosition },
      })
    );
  }

  _handleKeyDown(event) {
    const container = this.closest('capsule-comparison');
    if (!container) return;

    let newPosition = Number(container.position) || 50;
    const step = event.shiftKey ? 10 : 1;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newPosition = Math.max(0, newPosition - step);
        break;
      case 'ArrowRight':
        event.preventDefault();
        newPosition = Math.min(100, newPosition + step);
        break;
      case 'Home':
        event.preventDefault();
        newPosition = 0;
        break;
      case 'End':
        event.preventDefault();
        newPosition = 100;
        break;
      default:
        return;
    }

    container.setPosition(newPosition);
    this.setAttribute('aria-valuenow', Number(newPosition).toFixed(0));
  }
}

customElements.define('capsule-comparison-line', CapsuleComparisonLine);
