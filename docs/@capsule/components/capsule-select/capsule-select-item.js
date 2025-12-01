import { LitElement, html } from '../../lit';

class CapsuleSelectItem extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    selected: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.value = '';
    this.disabled = false;
    this.selected = false;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('tabindex', '-1');
    
    if (this.hasAttribute('value')) {
      this.value = this.getAttribute('value');
    }

    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('mouseenter', this._handleMouseEnter);
    
    const select = this.closest('capsule-select');
    if (select) {
      if (select.value === this.value) {
        this.selected = true;
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('mouseenter', this._handleMouseEnter);
  }

  updated(changedProperties) {
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('select-item-click', {
        detail: { value: this.value },
        bubbles: true,
        cancelable: true,
      })
    );
  }

  _handleMouseEnter() {
    if (!this.disabled) {
      // Удаляем active у других
      const select = this.closest('capsule-select');
      if (select && select.open) {
        const items = select.querySelectorAll('capsule-select-item');
        items.forEach((item) => item.removeAttribute('active'));
        this.setAttribute('active', '');
      }
    }
  }
}

customElements.define('capsule-select-item', CapsuleSelectItem);