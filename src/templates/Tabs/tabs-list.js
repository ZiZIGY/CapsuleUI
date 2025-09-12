class TabsList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._updateAriaAttributes();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <div part="list">
        <slot></slot>
      </div>
    `;
  }

  _updateAriaAttributes() {
    this.setAttribute('role', 'tablist');
  }
}

customElements.define('__PREFIX__-__COMPONENT__-list', TabsList);
