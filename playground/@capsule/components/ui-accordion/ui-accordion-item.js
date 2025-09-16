class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._trigger = null;
    this._content = null;
    this._accordion = null;
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
    this._findAccordion();
    this._updateAriaAttributes();
  }

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      this._updateAriaAttributes();
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <slot name="trigger"></slot>
      <div class="content" part="content">
        <slot name="content"></slot>
      </div>
    `;

    this._trigger = this.shadowRoot.querySelector('slot[name="trigger"]');
    this._content = this.shadowRoot.querySelector('[part="content"]');
  }

  _setupEventListeners() {
    this._trigger.addEventListener('slotchange', () => {
      const assignedElements = this._trigger.assignedElements();
      assignedElements.forEach(element => {
        element.addEventListener('click', this._handleTriggerClick.bind(this));
      });
    });
  }

  _findAccordion() {
    this._accordion = this.closest('ui-accordion');
  }

  _handleTriggerClick(event) {
    event.preventDefault();
    this._toggle();
  }

  _toggle() {
    const event = new CustomEvent('accordion-item-toggle', {
      bubbles: true,
      detail: { item: this }
    });
    this.dispatchEvent(event);
  }

  _updateAriaAttributes() {
    const isOpen = this.hasAttribute('open');
    this.setAttribute('role', 'region');
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    const assignedElements = this._trigger?.assignedElements();
    assignedElements?.forEach(element => {
      element.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    if (this._content) {
      this._content.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
  }

  toggle() {
    this._toggle();
  }
}

customElements.define('ui-accordion-item', AccordionItem);
