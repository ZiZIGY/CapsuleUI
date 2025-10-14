class AccordionTrigger extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event) {
    event.preventDefault();
    const panel = this.closest('capsule-accordion-panel');
    if (panel) {
      panel.toggle();
    }
  }
}

customElements.define('capsule-accordion-trigger', AccordionTrigger);
