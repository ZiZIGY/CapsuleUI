class Autocomplete extends HTMLElement {
  #value = '';

  constructor() {
    super();
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  connectedCallback() {
    this.setAttribute('tabindex', 1);
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.addEventListener('input', (e) => {
      this.#value = e.target.value;
    });
    this.addEventListener('change', (e) => (this.#value = e.target.value));
    this.addEventListener('keydown', this.#handleKeydown);
  }

  #handleKeydown(e) {
    const optionsContainer = this.querySelector('capsule-autocomplete-options');
    if (!optionsContainer) return;

    const options = optionsContainer.getOptions();
    const activeOption = optionsContainer.getActiveOption();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.#navigateOptions(options, activeOption, 'next');
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.#navigateOptions(options, activeOption, 'prev');
        break;

      case 'Enter':
        e.preventDefault();
        if (activeOption) {
          const activeValue = optionsContainer.getActiveValue();
          this.#value = activeValue;
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
        break;

      case 'Escape':
        this.blur();
        break;

      case 'Home':
        e.preventDefault();
        if (options.length > 0) {
          optionsContainer.setActiveOption(options[0]);
        }
        break;

      case 'End':
        e.preventDefault();
        if (options.length > 0) {
          optionsContainer.setActiveOption(options[options.length - 1]);
        }
        break;

      case 'Tab':
        if (activeOption) {
          e.preventDefault();
          const activeValue = optionsContainer.getActiveValue();
          this.#value = activeValue;
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
        break;
    }
  }

  #navigateOptions(options, activeOption, direction) {
    if (options.length === 0) return;

    let newIndex = 0;

    if (activeOption) {
      const currentIndex = Array.from(options).indexOf(activeOption);

      if (direction === 'next') {
        newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      }
    }

    const optionsContainer = this.querySelector('capsule-autocomplete-options');
    optionsContainer.setActiveOption(options[newIndex]);

    options[newIndex].scrollIntoView({ block: 'nearest' });
  }
}
customElements.define('capsule-autocomplete', Autocomplete);
