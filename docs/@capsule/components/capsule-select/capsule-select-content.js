import { LitElement, html } from '../../lit';

class CapsuleSelectContent extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('part', 'content');
    this.setAttribute('role', 'listbox');
    this.setAttribute('hidden', '');
    
    const select = this.closest('capsule-select');
    if (select) {
      const observer = new MutationObserver(() => {
        if (select.open) {
          this.removeAttribute('hidden');
        } else {
          this.setAttribute('hidden', '');
        }
      });
      observer.observe(select, {
        attributes: true,
        attributeFilter: ['open'],
      });
      this._observer = observer;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('capsule-select-content', CapsuleSelectContent);