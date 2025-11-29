import { LitElement, html } from '../../lit';

class CapsuleTabsTrigger extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this._updateAriaAttributes();
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  updated(changedProperties) {
    if (changedProperties.has('active')) {
      this._updateAriaAttributes();
    }
  }

  render() {
    return html`<slot part="trigger"></slot>`;
  }

  _handleClick(event) {
    event.preventDefault();

    const customEvent = new CustomEvent('tabs-trigger-click', {
      bubbles: true,
      detail: { trigger: this },
    });
    this.dispatchEvent(customEvent);
  }

  _updateAriaAttributes() {
    const isActive =
      this.hasAttribute('active') && this.getAttribute('active') !== 'false';
    this.setAttribute('aria-selected', isActive ? 'true' : 'false');

    const value = this.getAttribute('value');
    if (value) {
      this.setAttribute('aria-controls', `tabs-panel-${value}`);
    }
  }
}

customElements.define('capsule-tabs-trigger', CapsuleTabsTrigger);
