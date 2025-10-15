class ScrollArea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  connectedCallback() {
    this._render();
    this._content = this.shadowRoot.querySelector('.scroll-area-content');
    this._thumbV = this.shadowRoot.querySelector('[part="thumb-vertical"]');
    this._thumbH = this.shadowRoot.querySelector('[part="thumb-horizontal"]');
    this._resizeObserver = new ResizeObserver(this._onResize);
    this._resizeObserver.observe(this._content);
    this._content.addEventListener('scroll', this._onScroll);
    this._onScroll(); // initial
  }

  disconnectedCallback() {
    if (this._content)
      this._content.removeEventListener('scroll', this._onScroll);
    if (this._resizeObserver) this._resizeObserver.disconnect();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          overflow: hidden;
          --thumb-color: var(--capsule-color-border, #d1d5db);
          --thumb-radius: 6px;
          --thumb-size: 8px;
          max-width: 100%;
          max-height: 100%;
        }
        .scroll-area-content {
          width: 100%;
          height: 100%;
          overflow: auto;
            -ms-overflow-style: none;
          scrollbar-width: none;
          box-sizing: border-box;
          &::-webkit-scrollbar {
            display: none;
          }
        }
        [part="thumb-vertical"], [part="thumb-horizontal"] {
          position: absolute;
          background: var(--thumb-color);
          border-radius: var(--thumb-radius);
          opacity: 0.65;
          transition: opacity 0.2s;
          z-index: 1;
          user-select: none;
          pointer-events: auto;
        }
        [part="thumb-vertical"] {
          width: var(--thumb-size);
          right: 2px;
        }
        [part="thumb-horizontal"] {
          height: var(--thumb-size);
          bottom: 2px;
        }
      </style>
      <div class="scroll-area-content">
        <slot></slot>
      </div>
      <div part="thumb-vertical"></div>
      <div part="thumb-horizontal"></div>
    `;
  }

  _onScroll() {
    const content = this._content;
    if (!content) return;
    // Vertical
    const vh = content.clientHeight,
      th = content.scrollHeight;
    if (th > vh + 1) {
      const thumbH = this._thumbV;
      const thumbLen = Math.max((vh / th) * vh, 18);
      const thumbTop = (content.scrollTop / (th - vh)) * (vh - thumbLen);
      thumbH.style.display = '';
      thumbH.style.height = thumbLen + 'px';
      thumbH.style.top = content.offsetTop + thumbTop + 'px';
      thumbH.style.right = '2px';
      thumbH.style.left = 'auto';
      thumbH.style.width = 'var(--thumb-size)';
    } else {
      this._thumbV.style.display = 'none';
    }
    // Horizontal
    const vw = content.clientWidth,
      tw = content.scrollWidth;
    if (tw > vw + 1) {
      const thumbW = this._thumbH;
      const thumbLen = Math.max((vw / tw) * vw, 18);
      const thumbLeft = (content.scrollLeft / (tw - vw)) * (vw - thumbLen);
      thumbW.style.display = '';
      thumbW.style.width = thumbLen + 'px';
      thumbW.style.left = content.offsetLeft + thumbLeft + 'px';
      thumbW.style.bottom = '2px';
      thumbW.style.top = 'auto';
      thumbW.style.height = 'var(--thumb-size)';
    } else {
      this._thumbH.style.display = 'none';
    }
  }

  _onResize() {
    this._onScroll();
  }
}
customElements.define('capsule-scroll-area', ScrollArea);
