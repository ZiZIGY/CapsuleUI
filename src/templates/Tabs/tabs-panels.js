class TabsPanels extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <div part="panels">
        <slot></slot>
      </div>
    `;
  }
}
customElements.define('__PREFIX__-__COMPONENT__-panels', TabsPanels);
