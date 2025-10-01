class MotionElement extends HTMLElement {
  static observedAttributes = [
    'animate',
    'initial',
    'while-hover',
    'while-tap',
    'transition',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isConnected = false;
    this._initialStyleElement = null;
  }

  connectedCallback() {
    this._isConnected = true;
    this._render();

    this._applyInitial();

    setTimeout(() => {
      this._applyAnimate();
    }, 10);

    this._attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._isConnected || oldValue === newValue) return;

    switch (name) {
      case 'animate':
        this._applyAnimate();
        break;
      case 'initial':
        this._applyInitial();
        break;
      case 'transition':
        this._updateTransition();
        break;
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>
    `;

    this._initialStyleElement = document.createElement('style');
    this._initialStyleElement.setAttribute('data-initial', '');
    this.shadowRoot.appendChild(this._initialStyleElement);
  }

  _camelToKebab(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  _generateCssText(styleObject) {
    let cssText = '';
    for (const selector in styleObject) {
      cssText += `${selector} {\n`;
      for (const prop in styleObject[selector]) {
        const cssProp = this._camelToKebab(prop);
        cssText += `  ${cssProp}: ${styleObject[selector][prop]};\n`;
      }
      cssText += '}\n';
    }
    return cssText;
  }

  _applyInitial() {
    const initial = this.getAttribute('initial');
    if (!initial || !this._initialStyleElement) return;

    try {
      const styles = JSON.parse(initial);
      const cssObject = {
        ':host': styles,
      };

      const cssText = this._generateCssText(cssObject);
      this._initialStyleElement.textContent = cssText;
    } catch (error) {
      console.error('Error parsing initial styles:', error);
    }
  }

  _applyAnimate() {
    const animate = this.getAttribute('animate');
    if (!animate) return;

    try {
      const styles = JSON.parse(animate);
      const transition = this._parseTransition();

      this._updateTransition(transition);

      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = this._camelToKebab(property);
        this.style.setProperty(cssProperty, value);
      });
    } catch (error) {
      console.error('Error parsing animate styles:', error);
    }
  }

  _parseTransition() {
    const transition = this.getAttribute('transition');
    if (!transition) return { duration: 300, ease: 'ease' };

    try {
      return JSON.parse(transition);
    } catch {
      return { duration: 300, ease: 'ease' };
    }
  }

  _updateTransition(transition = null) {
    if (!transition) {
      transition = this._parseTransition();
    }

    const { duration = 300, ease = 'ease' } = transition;
    this.style.transition = `all ${duration}ms ${ease}`;
  }

  _attachEventListeners() {
    this._setupHoverAnimation();
    this._setupTapAnimation();
  }

  _setupHoverAnimation() {
    const whileHover = this.getAttribute('while-hover');
    if (!whileHover) return;

    try {
      const hoverStyles = JSON.parse(whileHover);
      const originalStyles = this._getCurrentAnimateStyles();

      this.addEventListener('mouseenter', () => {
        Object.entries(hoverStyles).forEach(([property, value]) => {
          const cssProperty = this._camelToKebab(property);
          this.style.setProperty(cssProperty, value);
        });
      });

      this.addEventListener('mouseleave', () => {
        Object.entries(originalStyles).forEach(([property, value]) => {
          const cssProperty = this._camelToKebab(property);
          this.style.setProperty(cssProperty, value);
        });
      });
    } catch (error) {
      console.error('Error parsing while-hover styles:', error);
    }
  }

  _setupTapAnimation() {
    const whileTap = this.getAttribute('while-tap');
    if (!whileTap) return;

    try {
      const tapStyles = JSON.parse(whileTap);
      const originalStyles = this._getCurrentAnimateStyles();

      this.addEventListener('mousedown', () => {
        Object.entries(tapStyles).forEach(([property, value]) => {
          const cssProperty = this._camelToKebab(property);
          this.style.setProperty(cssProperty, value);
        });
      });

      this.addEventListener('mouseup', () => {
        Object.entries(originalStyles).forEach(([property, value]) => {
          const cssProperty = this._camelToKebab(property);
          this.style.setProperty(cssProperty, value);
        });
      });

      this.addEventListener('touchstart', () => {
        Object.entries(tapStyles).forEach(([property, value]) => {
          const cssProperty = this._camelToKebab(property);
          this.style.setProperty(cssProperty, value);
        });
      });

      this.addEventListener('touchend', () => {
        Object.entries(originalStyles).forEach(([property, value]) => {
          const cssProperty = this._camelToKebab(property);
          this.style.setProperty(cssProperty, value);
        });
      });
    } catch (error) {
      console.error('Error parsing while-tap styles:', error);
    }
  }

  _getCurrentAnimateStyles() {
    const animate = this.getAttribute('animate');
    try {
      return animate ? JSON.parse(animate) : {};
    } catch {
      return {};
    }
  }

  // Public API
  start(animation, options = {}) {
    try {
      const styles = JSON.parse(animation);

      if (options.duration || options.ease) {
        this._updateTransition(options);
      }

      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = this._camelToKebab(property);
        this.style.setProperty(cssProperty, value);
      });
    } catch (error) {
      console.error('Error parsing start animation:', error);
    }
  }

  stop() {
    this.style.transition = 'none';
  }

  reset() {
    this.stop();
    this._applyInitial();
    const animateStyles = this._getCurrentAnimateStyles();
    Object.keys(animateStyles).forEach((property) => {
      const cssProperty = this._camelToKebab(property);
      this.style.removeProperty(cssProperty);
    });
  }

  setVariants(variants) {
    this._variants = variants;
  }

  variant(name) {
    if (this._variants && this._variants[name]) {
      this.start(JSON.stringify(this._variants[name]));
    }
  }
}

customElements.define('motion-element', MotionElement);
