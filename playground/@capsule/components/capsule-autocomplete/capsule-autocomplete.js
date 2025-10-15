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
    this.addEventListener('input', (e) => (this.#value = e.target.value));
    this.addEventListener('change', (e) => (this.#value = e.target.value));
    this.addEventListener('keydown', this.#handleKeydown);
    this.addEventListener('keyup', this.#handleKeyup);
  }

  #handleKeydown = (e) => {
    const optionsContainer = this.querySelector(
      'capsule-autocomplete-options'
    );
    if (!optionsContainer) return;

    const options = optionsContainer.getOptions();

    console.log(options);

    if (e.key === 'Enter') {
      const activeValue = optionsContainer.getActiveValue();
      if (activeValue) {
        console.log('Selected value:', activeValue);
      }
    }
  };

  #handleKeyup = (e) => {
    // Можно добавить логику для keyup если нужно
  };
}
customElements.define('capsule-autocomplete', Autocomplete);
