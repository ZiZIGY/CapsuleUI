class BreadcrumbSeparator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `<slot>/</slot>`;
  }
}
customElements.define(
  'capsule-breadcrumb-separator',
  BreadcrumbSeparator
);
