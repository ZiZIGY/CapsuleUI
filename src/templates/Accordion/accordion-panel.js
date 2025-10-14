class AccordionPanel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'region');
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this.addEventListener('toggle', this._handleToggle.bind(this));
  }

  _handleToggle() {
    const event = new CustomEvent('panel-toggle', {
      bubbles: true,
      detail: { panel: this },
    });
    this.dispatchEvent(event);
  }

  toggle() {
    this.dispatchEvent(new CustomEvent('toggle'));
  }
}

customElements.define('__PREFIX__-__COMPONENT__-panel', AccordionPanel);
