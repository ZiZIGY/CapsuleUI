class Autocomplete extends HTMLElement {
  #value = '';
  #isOpen = false;

  constructor() {
    super();
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get isOpen() {
    return this.#isOpen;
  }

  connectedCallback() {
    this.setAttribute('tabindex', 1);
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.addEventListener('input', (e) => {
      this.#value = e.target.value;
      this.#openOptions();
    });
    this.addEventListener('change', (e) => (this.#value = e.target.value));
    this.addEventListener('keydown', this.#handleKeydown);
    this.addEventListener('focus', this.#openOptions);
    this.addEventListener('blur', this.#closeOptions);

    // Слушаем событие выбора опции
    this.addEventListener('autocomplete-option-select', (e) => {
      this.#value = e.detail;
      this.#closeOptions();
      this.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  #openOptions = () => {
    const optionsContainer = this.querySelector(
      'capsule-autocomplete-options'
    );
    if (optionsContainer) {
      optionsContainer.style.display = 'block';
      this.#isOpen = true;

      // Активируем первую опцию при открытии
      const options = optionsContainer.getOptions();
      if (options.length > 0) {
        optionsContainer.setActiveOption(options[0]);
      }
    }
  };

  #closeOptions = () => {
    const optionsContainer = this.querySelector(
      'capsule-autocomplete-options'
    );
    if (optionsContainer) {
      // Небольшая задержка чтобы клик по опции успел обработаться
      setTimeout(() => {
        optionsContainer.style.display = 'none';
        this.#isOpen = false;
        optionsContainer.setActiveOption(null);
      }, 150);
    }
  };

  #handleKeydown = (e) => {
    const optionsContainer = this.querySelector(
      'capsule-autocomplete-options'
    );
    if (!optionsContainer) return;

    const options = optionsContainer.getOptions();
    const activeOption = optionsContainer.getActiveOption();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.#openOptions();
        this.#navigateOptions(options, activeOption, 'next');
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.#openOptions();
        this.#navigateOptions(options, activeOption, 'prev');
        break;

      case 'Enter':
        e.preventDefault();
        if (this.#isOpen && activeOption) {
          const activeValue = optionsContainer.getActiveValue();
          this.#value = activeValue;
          this.#closeOptions();
          this.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          this.#openOptions();
        }
        break;

      case 'Escape':
        e.preventDefault();
        this.#closeOptions();
        break;

      case 'Home':
        e.preventDefault();
        this.#openOptions();
        if (options.length > 0) {
          optionsContainer.setActiveOption(options[0]);
        }
        break;

      case 'End':
        e.preventDefault();
        this.#openOptions();
        if (options.length > 0) {
          optionsContainer.setActiveOption(options[options.length - 1]);
        }
        break;

      case 'Tab':
        if (this.#isOpen && activeOption) {
          e.preventDefault();
          const activeValue = optionsContainer.getActiveValue();
          this.#value = activeValue;
          this.#closeOptions();
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
        this.#closeOptions();
        break;
    }
  };

  #navigateOptions = (options, activeOption, direction) => {
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

    const optionsContainer = this.querySelector(
      'capsule-autocomplete-options'
    );
    optionsContainer.setActiveOption(options[newIndex]);

    // Прокручиваем к активному элементу
    options[newIndex].scrollIntoView({ block: 'nearest' });
  };
}

customElements.define('capsule-autocomplete', Autocomplete);
