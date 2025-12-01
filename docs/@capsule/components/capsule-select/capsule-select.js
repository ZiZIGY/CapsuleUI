import { LitElement, html } from '../../lit';

class CapsuleSelect extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.value = '';
    this.disabled = false;
    this.open = false;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', 'false');

    this.addEventListener('select-item-click', this._handleItemClick);
    this.addEventListener('select-trigger-click', this._handleTriggerClick);
    this.addEventListener('keydown', this._handleKeydown);
    document.addEventListener('click', this._handleOutsideClick);

    this._updateSelection();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('select-item-click', this._handleItemClick);
    this.removeEventListener('select-trigger-click', this._handleTriggerClick);
    this.removeEventListener('keydown', this._handleKeydown);
    document.removeEventListener('click', this._handleOutsideClick);
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._updateSelection();
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
        })
      );
    }

    if (changedProperties.has('open')) {
      this.setAttribute('aria-expanded', this.open ? 'true' : 'false');
      this._updateContentVisibility();
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      if (this.disabled) {
        this.open = false;
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  _handleTriggerClick() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  _handleItemClick(e) {
    const value = e.detail?.value;
    if (value !== null) {
      this.value = value;
      this.open = false;
    }
  }

  _handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this.open = false;
    }
  }

  _updateSelection() {
    const items = this.querySelectorAll('capsule-select-item');
    items.forEach((item) => {
      if (item.getAttribute('value') === this.value) {
        item.setAttribute('selected', '');
      } else {
        item.removeAttribute('selected');
      }
    });

    this._updateValue();
  }

  _updateValue() {
    const valueEl = this.querySelector('capsule-select-value');
    if (!valueEl) return;

    if (!this.value) {
      valueEl.innerHTML = '';
      return;
    }

    const selectedItem = this.querySelector(
      `capsule-select-item[value="${this.value}"]`
    );

    if (selectedItem) {
      // Простое копирование - пользователь контролирует содержимое
      valueEl.innerHTML = selectedItem.innerHTML;
    } else {
      valueEl.innerHTML = '';
    }
  }

  _updateContentVisibility() {
    const content = this.querySelector('capsule-select-content');
    if (content) {
      if (this.open) {
        content.removeAttribute('hidden');
      } else {
        content.setAttribute('hidden', '');
      }
    }
  }

  _handleKeydown(e) {
    if (this.disabled) return;

    const items = Array.from(
      this.querySelectorAll('capsule-select-item:not([disabled])')
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.open = true;
        } else {
          this._navigateItems(items, 'next', e.target);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) {
          this.open = true;
        } else {
          this._navigateItems(items, 'prev', e.target);
        }
        break;

      case 'Enter':
      case ' ':
        if (this.open) {
          const active = this.querySelector(
            'capsule-select-item[active]'
          );
          if (active) {
            e.preventDefault();
            this.value = active.getAttribute('value');
            this.open = false;
          }
        }
        break;

      case 'Escape':
        if (this.open) {
          e.preventDefault();
          this.open = false;
          items.forEach((item) => item.removeAttribute('active'));
        }
        break;
    }
  }

  _navigateItems(items, direction, target) {
    if (items.length === 0) return;

    const active = this.querySelector('capsule-select-item[active]');
    let currentIndex = active ? items.indexOf(active) : -1;

    items.forEach((item) => item.removeAttribute('active'));

    let newIndex = 0;
    if (currentIndex >= 0) {
      newIndex =
        direction === 'next'
          ? currentIndex < items.length - 1
            ? currentIndex + 1
            : 0
          : currentIndex > 0
          ? currentIndex - 1
          : items.length - 1;
    }

    const nextItem = items[newIndex];
    if (nextItem) {
      nextItem.setAttribute('active', '');
      nextItem.scrollIntoView({ block: 'nearest' });
    }
  }

  // Public methods
  openDropdown() {
    if (!this.disabled) this.open = true;
  }

  closeDropdown() {
    this.open = false;
  }

  toggleDropdown() {
    if (!this.disabled) this.open = !this.open;
  }
}

customElements.define('capsule-select', CapsuleSelect);
