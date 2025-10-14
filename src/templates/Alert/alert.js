class Alert extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'alert');

    // Устанавливаем дефолтный вариант если не указан
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }

    // Добавляем иконку если есть
    this._setupIcon();
  }

  _setupIcon() {
    // Если первый элемент - иконка, добавляем класс для стилизации
    const firstChild = this.firstElementChild;
    if (
      firstChild &&
      firstChild.tagName &&
      (firstChild.tagName.includes('svg') ||
        firstChild.classList.contains('icon'))
    ) {
      firstChild.classList.add('alert-icon');
    }
  }

  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'variant') {
      // Обновляем классы при изменении варианта
      this.classList.remove(`alert-${oldValue}`);
      this.classList.add(`alert-${newValue}`);
    }
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Alert);
