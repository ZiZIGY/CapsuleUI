const rippleButtonVariants = {
  size: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-400 text-gray-900 bg-transparent',
  },
  default: {
    size: 'md',
    variant: 'primary',
  },
};

class RippleButton extends HTMLElement {
  constructor() {
    super();
    this._$rippleContainer = null;
    this.attachShadow({ mode: 'open' });
    this._render();
    this._applyStyles();
  }

  connectedCallback() {
    this._setupEventListeners();
    this._updateClassNames();
    if (!this.hasAttribute('type')) {
      this.setAttribute('type', 'button');
    }
  }

  static get observedAttributes() {
    return ['disabled', 'type', 'size', 'variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (['size', 'variant'].includes(name)) {
      this._updateClassNames();
    }
  }

  _updateClassNames() {
    const size = this.getAttribute('size') || rippleButtonVariants.default.size;
    const variant =
      this.getAttribute('variant') || rippleButtonVariants.default.variant;
    const sizeClass = rippleButtonVariants.size[size] || '';
    const variantClass = rippleButtonVariants.variant[variant] || '';
    this.className = `${sizeClass} ${variantClass}`;
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <slot></slot>
      <div class="ripple-container"></div>
    `;
    this._$rippleContainer = this.shadowRoot.querySelector('.ripple-container');
  }

  _applyStyles() {
    const style = document.createElement('style');
    style.textContent = ``;
    style.textContent = `button {
  position: relative;
  overflow: hidden;
  width: 100%;
  outline: none;
  background-color: transparent;
  border: none;
}

.ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: var(--ripple-color, rgba(255, 255, 255, 0.5));
  pointer-events: none;
  transform: scale(0);
  transition: 0.3s linear;
}

.ripple.grow {
  transform: scale(0);
  animation: ripple-grow 1s ease-out forwards;
}

.ripple.fade {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

@keyframes ripple-grow {
  to {
    transform: scale(4);
  }
}

@keyframes ripple-fade {
  to {
    opacity: 0;
  }
}
`;
    this.shadowRoot.appendChild(style);
  }

  _setupEventListeners() {
    this.addEventListener('pointerdown', this._createRipple.bind(this));
    this.addEventListener('pointerup', this._fadeRipple.bind(this));
    this.addEventListener('pointerleave', this._fadeRipple.bind(this));
    this.addEventListener('pointercancel', this._fadeRipple.bind(this));
  }

  _createRipple(event) {
    if (this.hasAttribute('disabled')) {
      return;
    }
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple', 'grow');
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    this._$rippleContainer.appendChild(ripple);
  }

  _fadeRipple() {
    const ripple = this._$rippleContainer.querySelector('.ripple:last-child');
    if (ripple) {
      ripple.classList.add('fade');
      ripple.addEventListener('transitionend', () => ripple.remove(), {
        once: true,
      });
    }
  }
}

customElements.define('ui-ripple-button', RippleButton);
