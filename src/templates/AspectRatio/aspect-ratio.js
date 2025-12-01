import { LitElement, html } from '../../lit';

class CapsuleAspectRatio extends LitElement {
  static properties = {
    ratio: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.ratio = '';
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateAspectRatio();
  }

  updated(changedProperties) {
    if (changedProperties.has('ratio')) {
      this._updateAspectRatio();
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  _updateAspectRatio() {
    if (!this.ratio) {
      this.style.setProperty('--aspect-ratio', '');
      return;
    }

    let ratioValue = this.ratio.trim();

    if (ratioValue.includes(':')) {
      ratioValue = ratioValue.replace(':', '/');
    }

    if (!ratioValue.includes('/') && !isNaN(parseFloat(ratioValue))) {
      ratioValue = `${ratioValue} / 1`;
    }

    this.style.setProperty('--aspect-ratio', ratioValue);
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleAspectRatio);
