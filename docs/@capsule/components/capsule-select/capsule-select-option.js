import { LitElement, html } from '../../lit';

class CapsuleSelectOption extends LitElement {
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
    this._onClick = this._onClick.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('tabindex', '-1');
    
    if (!this.value && this.hasAttribute('value')) {
      this.value = this.getAttribute('value');
    }

    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }

    this._updateAriaAttributes();
    this._updateSelection();
    this.addEventListener('click', this._onClick);
    this.addEventListener('mouseenter', this._onMouseEnter);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
    this.removeEventListener('mouseenter', this._onMouseEnter);
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.setAttribute('tabindex', this.disabled ? '-1' : '-1');
    }

    if (changedProperties.has('selected')) {
      this._updateSelection();
      this._updateAriaAttributes();
    }

    if (changedProperties.has('value')) {
      this._updateSelection();
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  _updateSelection() {
    const select = this._getSelect();
    if (select && select.value === this.value) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  _updateAriaAttributes() {
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
  }

  _getSelect() {
    return this.closest('capsule-select');
  }

  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('select-option-select', {
        detail: { option: this, value: this.value },
        bubbles: true,
        cancelable: true,
      })
    );
  }

  _onMouseEnter() {
    if (!this.disabled) {
      const select = this._getSelect();
      if (select && select.open) {
        this.setAttribute('active', '');
        this.setAttribute('aria-selected', 'true');
        
        // Clear other active options
        const allOptions = select.querySelectorAll(
          'capsule-select-option[active]'
        );
        allOptions.forEach((option) => {
          if (option !== this) {
            option.removeAttribute('active');
            option.removeAttribute('aria-selected');
          }
        });
      }
    }
  }
}

customElements.define('capsule-select-option', CapsuleSelectOption);
