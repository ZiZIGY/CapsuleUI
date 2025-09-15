class Tooltip extends HTMLElement {
  constructor() {
    super();

    this._tooltip = null;
    this._trigger = null;

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this._cleanup();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
      <div part="tooltip" role="tooltip">
        <slot name="content"></slot>
      </div>
    `;

    this._tooltip = this.shadowRoot.querySelector('[part="tooltip"]');
    this._trigger = this.shadowRoot.querySelector('slot[name="trigger"]');
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Tooltip);
