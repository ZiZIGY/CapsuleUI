import { LitElement, html } from '../../lit';

class CapsuleButton extends LitElement {
  static formAssociated = true;

  static properties = {
    disabled: { type: Boolean, reflect: true },
    type: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.disabled = false;
    this.type = 'button';
    this._internals = this.attachInternals?.();
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this._updateAriaDisabled();

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      this._updateAriaDisabled();
    }
  }

  _updateAriaDisabled() {
    // ✅ Правильное определение disabled состояния
    const isDisabled = this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false';
    
    if (isDisabled) {
      this.setAttribute('aria-disabled', 'true');
      this.tabIndex = -1;
    } else {
      this.setAttribute('aria-disabled', 'false');
      this.tabIndex = 0;
    }
  }

  _handleClick = (e) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  _handleKeydown = (e) => {
    const isDisabled = this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false';
    if (isDisabled) return;
    
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.click();
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('__PREFIX__-__COMPONENT__', CapsuleButton);