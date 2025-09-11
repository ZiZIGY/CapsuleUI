class Skeleton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.setAttribute('role', 'presentation');
    this.setAttribute('aria-hidden', 'true');
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Skeleton);
