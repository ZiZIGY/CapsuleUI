class AutocompleteOptions extends HTMLElement {
  constructor() {
    super();
  }

  getOptions() {
    return this.querySelectorAll('capsule-autocomplete-option');
  }

  getActiveOption() {
    return this.querySelector('capsule-autocomplete-option.active');
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

customElements.define('capsule-autocomplete-options', AutocompleteOptions);
