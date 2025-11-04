import { LitElement, html, css } from '../../lit';

class ScrollArea extends LitElement {
  static styles = css`
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
    }

    .scroll-area-content::-webkit-scrollbar {
      display: none;
    }

    .scrollbar-vertical {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: calc(var(--thumb-size, 8px) + 4px);
      pointer-events: none;
      z-index: 1;
    }

    .scrollbar-horizontal {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: calc(var(--thumb-size, 8px) + 4px);
      pointer-events: none;
      z-index: 1;
    }

    [part='track-vertical'],
    [part='track-horizontal'] {
      position: absolute;
      background: var(--track-color, transparent);
      border-radius: var(--track-radius, 0);
    }

    [part='track-vertical'] {
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    [part='track-horizontal'] {
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }

    [part='thumb-vertical'],
    [part='thumb-horizontal'] {
      position: absolute;
      background: var(--thumb-color);
      border-radius: var(--thumb-radius);
      opacity: 0.65;
      transition: opacity 0.2s;
      user-select: none;
      pointer-events: auto;
    }

    [part='thumb-vertical'] {
      width: var(--thumb-size);
      right: 2px;
      display: none;
    }

    [part='thumb-horizontal'] {
      height: var(--thumb-size);
      bottom: 2px;
      display: none;
    }
  `;

  constructor() {
    super();
    this._content = null;
    this._thumbV = null;
    this._thumbH = null;
    this._resizeObserver = null;
  }

  firstUpdated() {
    this._content = this.shadowRoot.querySelector('.scroll-area-content');
    this._thumbV = this.shadowRoot.querySelector('[part="thumb-vertical"]');
    this._thumbH = this.shadowRoot.querySelector('[part="thumb-horizontal"]');

    this._resizeObserver = new ResizeObserver(() => this._onScroll());
    this._resizeObserver.observe(this._content);

    this._content.addEventListener('scroll', () => this._onScroll());
    this._onScroll(); // initial calculation
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._content) {
      this._content.removeEventListener('scroll', this._onScroll);
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  render() {
    return html`
      <div class="scroll-area-content">
        <slot></slot>
      </div>

      <div class="scrollbar-vertical">
        <div part="track-vertical"></div>
        <div part="thumb-vertical"></div>
      </div>

      <div class="scrollbar-horizontal">
        <div part="track-horizontal"></div>
        <div part="thumb-horizontal"></div>
      </div>
    `;
  }

  _onScroll() {
    if (!this._content || !this._thumbV || !this._thumbH) return;

    // Vertical scrollbar
    const vh = this._content.clientHeight;
    const th = this._content.scrollHeight;

    if (th > vh + 1) {
      const thumbLen = Math.max((vh / th) * vh, 18);
      const thumbTop = (this._content.scrollTop / (th - vh)) * (vh - thumbLen);
      this._thumbV.style.display = '';
      this._thumbV.style.height = thumbLen + 'px';
      this._thumbV.style.top = this._content.offsetTop + thumbTop + 'px';
    } else {
      this._thumbV.style.display = 'none';
    }

    // Horizontal scrollbar
    const vw = this._content.clientWidth;
    const tw = this._content.scrollWidth;

    if (tw > vw + 1) {
      const thumbLen = Math.max((vw / tw) * vw, 18);
      const thumbLeft =
        (this._content.scrollLeft / (tw - vw)) * (vw - thumbLen);
      this._thumbH.style.display = '';
      this._thumbH.style.width = thumbLen + 'px';
      this._thumbH.style.left = this._content.offsetLeft + thumbLeft + 'px';
    } else {
      this._thumbH.style.display = 'none';
    }
  }
}

customElements.define('capsule-scroll-area', ScrollArea);
