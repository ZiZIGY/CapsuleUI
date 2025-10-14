class AccordionContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Просто контейнер для контента
    this.setAttribute('role', 'region');
  }
}

customElements.define('capsule-accordion-content', AccordionContent);
