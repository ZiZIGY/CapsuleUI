class AutocompleteOptions extends HTMLElement {
  constructor() {
    super();
  }

  getOptions() {
    return this.querySelectorAll('__PREFIX__-__COMPONENT__-option');
  }

  getActiveOption() {
    return this.querySelector('__PREFIX__-__COMPONENT__-option.active');
  }

  setActiveOption(option) {
    this.getOptions().forEach((opt) => opt.classList.remove('active'));
    if (option) {
      option.classList.add('active');
    }
  }

  getActiveValue() {
    const activeOption = this.getActiveOption();
    return activeOption ? activeOption.value : null;
  }
}

customElements.define('__PREFIX__-__COMPONENT__-options', AutocompleteOptions);
