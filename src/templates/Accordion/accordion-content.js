class AccordionContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Просто контейнер для контента
    this.setAttribute('role', 'region');
  }
}

customElements.define('__PREFIX__-__COMPONENT__-content', AccordionContent);
