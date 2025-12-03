import { LitElement, html } from '../../lit';

class CapsuleTourStep extends LitElement {
  static properties = {
    value: { type: Number, reflect: true },
    target: { type: String, reflect: true },
    position: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.value = null;
    this.target = '';
    this.position = 'bottom';
    this._overlayClass = 'tour-active';
    this._previousTarget = null;
    this._handleScroll = this._handleScroll.bind(this);
    this._handleResize = this._handleResize.bind(this);
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('hidden', '');
    window.addEventListener('scroll', this._handleScroll, true);
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll, true);
    window.removeEventListener('resize', this._handleResize);
    this._removeOverlay();
  }

  updated(changedProperties) {
    if (changedProperties.has('target') || changedProperties.has('position')) {
      this._init();
    }
  }

  firstUpdated() {
    this._observeHidden();
  }

  render() {
    return html`<slot></slot>`;
  }

  _observeHidden() {
    const observer = new MutationObserver(() => {
      this._init();
    });

    observer.observe(this, {
      attributes: true,
      attributeFilter: ['hidden'],
    });

    this._hiddenObserver = observer;
  }

  _init() {
    if (this.hasAttribute('hidden')) {
      this._removeOverlay();
      return;
    }

    if (!this.target) {
      return;
    }

    requestAnimationFrame(() => {
      this._applyOverlay();
      this._scrollToTarget();
      this._position();
    });
  }

  _applyOverlay() {
    this._removeOverlay();

    const targetElement = document.querySelector(this.target);
    if (!targetElement) {
      return;
    }

    targetElement.classList.add(this._overlayClass);
    this._previousTarget = targetElement;
  }

  _removeOverlay() {
    if (this._previousTarget) {
      this._previousTarget.classList.remove(this._overlayClass);
      this._previousTarget = null;
    }
  }

  _position() {
    if (!this.target || this.hasAttribute('hidden')) {
      return;
    }

    const targetElement = document.querySelector(this.target);
    if (!targetElement) {
      return;
    }

    const targetRect = targetElement.getBoundingClientRect();
    const stepRect = this.getBoundingClientRect();
    const position = this.position || 'bottom';
    const gap = 12;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = targetRect.top - stepRect.height - gap;
        left = targetRect.left + targetRect.width / 2 - stepRect.width / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + gap;
        left = targetRect.left + targetRect.width / 2 - stepRect.width / 2;
        break;
      case 'left':
        top = targetRect.top + targetRect.height / 2 - stepRect.height / 2;
        left = targetRect.left - stepRect.width - gap;
        break;
      case 'right':
        top = targetRect.top + targetRect.height / 2 - stepRect.height / 2;
        left = targetRect.right + gap;
        break;
      default:
        top = targetRect.bottom + gap;
        left = targetRect.left + targetRect.width / 2 - stepRect.width / 2;
    }

    // Keep within viewport
    const padding = 16;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    left = Math.max(
      padding,
      Math.min(left, viewportWidth - stepRect.width - padding)
    );
    top = Math.max(
      padding,
      Math.min(top, viewportHeight - stepRect.height - padding)
    );

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
  }

  _scrollToTarget() {
    if (!this.target) {
      return;
    }

    const targetElement = document.querySelector(this.target);
    if (!targetElement) {
      return;
    }

    const rect = targetElement.getBoundingClientRect();

    // Find scrollable containers
    let current = targetElement.parentElement;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const overflow = style.overflowY || style.overflowX || style.overflow;

      if (
        (overflow === 'auto' || overflow === 'scroll') &&
        (current.scrollHeight > current.clientHeight ||
          current.scrollWidth > current.clientWidth)
      ) {
        const containerRect = current.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top + current.scrollTop;
        const relativeLeft =
          rect.left - containerRect.left + current.scrollLeft;

        current.scrollTo({
          top: Math.max(
            0,
            relativeTop - current.clientHeight / 2 + rect.height / 2
          ),
          left: Math.max(
            0,
            relativeLeft - current.clientWidth / 2 + rect.width / 2
          ),
          behavior: 'smooth',
        });
      }

      current = current.parentElement;
    }

    // Scroll window
    window.scrollTo({
      top: Math.max(
        0,
        rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2
      ),
      left: Math.max(
        0,
        rect.left + window.scrollX - window.innerWidth / 2 + rect.width / 2
      ),
      behavior: 'smooth',
    });
  }

  _handleScroll() {
    if (!this.hasAttribute('hidden')) {
      requestAnimationFrame(() => {
        this._position();
      });
    }
  }

  _handleResize() {
    if (!this.hasAttribute('hidden')) {
      requestAnimationFrame(() => {
        this._position();
      });
    }
  }
}

customElements.define('capsule-tour-step', CapsuleTourStep);
