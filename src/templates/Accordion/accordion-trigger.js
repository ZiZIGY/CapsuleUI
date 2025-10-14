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
    const panel = this.closest('__PREFIX__-__COMPONENT__-panel');
    if (panel) {
      panel.toggle();
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__-trigger', AccordionTrigger);
