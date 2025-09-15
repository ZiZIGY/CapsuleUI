class Slider extends HTMLElement {
  static get observedAttributes() {
    return ['min', 'max', 'step', 'decimals', 'values'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._min = 0;
    this._max = 100;
    this._step = 1;
    this._decimals = 0;
    this._values = [25, 75];
    this._thumbs = [];
    this._activeThumb = null;
    this._activeThumbIndex = null;
  }

  connectedCallback() {
    this._parseAttributes();
    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
  }

  attributeChangedCallback() {
    this._parseAttributes();
    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
  }

  _parseAttributes() {
    this._min = parseFloat(this.getAttribute('min')) || 0;
    this._max = parseFloat(this.getAttribute('max')) || 100;
    this._step = parseFloat(this.getAttribute('step')) || 1;
    this._decimals = parseInt(this.getAttribute('decimals')) || 0;
    const valuesAttr = this.getAttribute('values');
    if (valuesAttr) {
      try {
        this._values = JSON.parse(valuesAttr);
      } catch {
        this._values = [25, 75];
      }
    }
    if (!this._values || this._values.length < 2) {
      this._values = [25, 75];
    }
    this._values = this._values.map(v => Math.max(this._min, Math.min(v, this._max))).sort((a, b) => a - b);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <div part="container">
        <div part="track"></div>
        <div part="range"></div>
      </div>
    `;
    this._container = this.shadowRoot.querySelector('[part="container"]');
    this._range = this.shadowRoot.querySelector('[part="range"]');
  }

  _initThumbs() {
    // Удаляем старые
    this._container.querySelectorAll('[part="thumb"]').forEach(t => t.remove());
    this._thumbs = [];
    this._values.forEach((value, index) => {
      const thumb = document.createElement('div');
      thumb.setAttribute('part', 'thumb');
      thumb.dataset.index = index;
      const label = document.createElement('div');
      label.setAttribute('part', 'label');
      label.textContent = this._formatValue(value);
      thumb.appendChild(label);
      this._container.appendChild(thumb);
      this._thumbs[index] = thumb;
      this._positionThumb(index);
    });
  }

  _positionThumb(index) {
    const thumb = this._thumbs[index];
    const percentage = ((this._values[index] - this._min) / (this._max - this._min)) * 100;
    thumb.style.left = `${percentage}%`;
    thumb.querySelector('[part="label"]').textContent = this._formatValue(this._values[index]);
  }

  _formatValue(value) {
    return value.toFixed(this._decimals);
  }

  _updateRange() {
    const minPercent = ((Math.min(...this._values) - this._min) / (this._max - this._min)) * 100;
    const maxPercent = ((Math.max(...this._values) - this._min) / (this._max - this._min)) * 100;
    this._range.style.left = `${minPercent}%`;
    this._range.style.width = `${maxPercent - minPercent}%`;
  }

  _bindEvents() {
    this._thumbs.forEach(thumb => {
      thumb.addEventListener('mousedown', this._onMouseDown.bind(this));
      thumb.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: false });
    });
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    document.addEventListener('mouseup', this._onMouseUp.bind(this));
    document.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this._onTouchEnd.bind(this));
  }

  _onMouseDown(e) {
    e.preventDefault();
    this._activeThumb = e.target.closest('[part="thumb"]');
    this._activeThumbIndex = parseInt(this._activeThumb.dataset.index);
    this._activeThumb.setAttribute('data-active', 'true');
  }

  _onTouchStart(e) {
    e.preventDefault();
    this._activeThumb = e.target.closest('[part="thumb"]');
    this._activeThumbIndex = parseInt(this._activeThumb.dataset.index);
    this._activeThumb.setAttribute('data-active', 'true');
  }

  _onMouseMove(e) {
    if (!this._activeThumb) return;
    const rect = this._container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    this._updateThumbPosition(x);
  }

  _onTouchMove(e) {
    if (!this._activeThumb) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this._container.getBoundingClientRect();
    let x = touch.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    this._updateThumbPosition(x);
  }

  _updateThumbPosition(x) {
    const percentage = (x / this._container.offsetWidth);
    let value = this._min + (percentage * (this._max - this._min));
    value = Math.round(value / this._step) * this._step;
    value = parseFloat(value.toFixed(6));
    value = parseFloat(value.toFixed(this._decimals));
    value = Math.max(this._min, Math.min(value, this._max));
    this._values[this._activeThumbIndex] = value;
    this._preventOverlap();
    this._values.forEach((_, index) => {
      this._positionThumb(index);
    });
    this._updateRange();
    this.dispatchEvent(new CustomEvent('sliderChange', {
      detail: { values: this._values }
    }));
  }

  _preventOverlap() {
    const sortedValues = [...this._values].sort((a, b) => a - b);
    const oldValues = [...this._values];
    this._values = sortedValues;
    const activeValue = oldValues[this._activeThumbIndex];
    this._activeThumbIndex = sortedValues.indexOf(activeValue);
    this._thumbs.forEach((thumb, index) => {
      thumb.dataset.index = index;
    });
  }

  _onMouseUp() {
    if (this._activeThumb) {
      this._activeThumb.removeAttribute('data-active');
      this._activeThumb = null;
      this._activeThumbIndex = null;
    }
  }

  _onTouchEnd() {
    if (this._activeThumb) {
      this._activeThumb.removeAttribute('data-active');
      this._activeThumb = null;
      this._activeThumbIndex = null;
    }
  }

  updateValues(options) {
    this._min = options.min !== undefined ? options.min : this._min;
    this._max = options.max !== undefined ? options.max : this._max;
    this._step = options.step !== undefined ? options.step : this._step;
    this._decimals = options.decimals !== undefined ? options.decimals : this._decimals;
    this._values = (options.values || this._values).map(val => Math.max(this._min, Math.min(val, this._max))).sort((a, b) => a - b);
    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
  }

  getValues() {
    return this._values;
  }

  getSettings() {
    return {
      min: this._min,
      max: this._max,
      step: this._step,
      decimals: this._decimals,
      values: this._values
    };
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Slider);
