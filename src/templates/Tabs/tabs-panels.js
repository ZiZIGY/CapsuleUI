class TabsPanels extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <slot></slot>
    `;
  }
}
customElements.define('__PREFIX__-__COMPONENT__-panels', TabsPanels);
