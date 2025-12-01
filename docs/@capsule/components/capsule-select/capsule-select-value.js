import { LitElement, html } from '../../lit';

class CapsuleSelectValue extends LitElement {
  static properties = {
    placeholder: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.placeholder = '';
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('part', 'value');
    
    const select = this.closest('capsule-select');
    if (select) {
      select.addEventListener('change', () => this._updateDisplay(select));
      this._updateDisplay(select);
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  _updateDisplay(select) {
    // Placeholder показывается только если нет значения и нет содержимого
    // Содержимое управляется из select.js через _updateValue()
    if (!select.value && !this.innerHTML.trim() && this.placeholder) {
      const existingPlaceholder = this.querySelector('span[style*="text-secondary"]');
      if (!existingPlaceholder) {
        const span = document.createElement('span');
        span.style.color = 'var(--capsule-color-text-secondary)';
        span.textContent = this.placeholder;
        this.appendChild(span);
      }
    } else if (select.value) {
      // Убираем placeholder если есть значение
      const placeholder = this.querySelector('span[style*="text-secondary"]');
      if (placeholder) {
        placeholder.remove();
      }
    }
  }
}

customElements.define('capsule-select-value', CapsuleSelectValue);