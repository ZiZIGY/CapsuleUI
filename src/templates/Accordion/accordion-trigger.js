class AccordionTrigger extends HTMLElement {
  static get observedAttributes() {
    return ['exclude-self'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this._updateAttributes();
    this.addEventListener('click', this._handleClick.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'exclude-self') {
      this._updateAttributes();
    }
  }

  _updateAttributes() {
    if (this.hasAttribute('exclude-self')) {
      this.removeAttribute('role');
      this.removeAttribute('tabindex');
    } else {
      this.setAttribute('role', 'button');
      this.setAttribute('tabindex', '0');
    }
  }

  _handleClick(event) {
    event.preventDefault();

    if (this.hasAttribute('exclude-self')) {
      if (event.currentTarget === event.target) return;
    }

    const panel = this.closest('capsule-accordion-panel');
    if (panel) {
      panel.toggle();
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__-trigger', AccordionTrigger);
