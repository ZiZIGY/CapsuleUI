class Slider extends HTMLElement {
  static get observedAttributes() {
    return ['min', 'max', 'step', 'decimals', 'values'];
  }

  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals_ = this.attachInternals();
    this._min = 0;
    this._max = 100;
    this._step = 1;
    this._decimals = 0;
    this._values = [25, 75];
    this._thumbs = [];
    this._activeThumb = null;
    this._activeThumbIndex = null;

    // Bind methods for event listeners
    this._onThumbPointerDown = this._onThumbPointerDown.bind(this);
    this._onSliderPointerDown = this._onSliderPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
  }

  connectedCallback() {
    this._parseAttributes();
    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
    this._updateFormValue();
  }

  disconnectedCallback() {
    this._unbindEvents();
  }

  attributeChangedCallback() {
    this._parseAttributes();
    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
    this._updateFormValue();
  }

  // Form-associated custom element methods
  formAssociatedCallback(form) {
    console.log('Form associated:', form);
  }

  formDisabledCallback(disabled) {
    this._container.style.opacity = disabled ? '0.5' : '1';
    this._container.style.pointerEvents = disabled ? 'none' : 'auto';
  }

  formResetCallback() {
    this._resetToEvenlyDistributedValues();
    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
    this._updateFormValue();
  }

  _resetToEvenlyDistributedValues() {
    const numValues = this._values.length;

    if (numValues === 1) {
      this._values = [this._min + (this._max - this._min) / 2];
    } else if (numValues === 2) {
      this._values = [this._min, this._max];
    } else {
      this._values = [];
      const step = (this._max - this._min) / (numValues - 1);

      for (let i = 0; i < numValues; i++) {
        let value = this._min + step * i;

        value = Math.round(value / this._step) * this._step;
        value = parseFloat(value.toFixed(6));
        value = parseFloat(value.toFixed(this._decimals));
        value = Math.max(this._min, Math.min(value, this._max));

        this._values.push(value);
      }
    }

    this._values.sort((a, b) => a - b);
  }

  _updateFormValue() {
    this.internals_.setFormValue(JSON.stringify(this._values));
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
    this._values = this._values
      .map((v) => Math.max(this._min, Math.min(v, this._max)))
      .sort((a, b) => a - b);
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
    this._container
      .querySelectorAll('[part="thumb"]')
      .forEach((t) => t.remove());
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
    const percentage =
      ((this._values[index] - this._min) / (this._max - this._min)) * 100;
    thumb.style.left = `${percentage}%`;
    thumb.querySelector('[part="label"]').textContent = this._formatValue(
      this._values[index]
    );
  }

  _formatValue(value) {
    return value.toFixed(this._decimals);
  }

  _updateRange() {
    const minPercent =
      ((Math.min(...this._values) - this._min) / (this._max - this._min)) * 100;
    const maxPercent =
      ((Math.max(...this._values) - this._min) / (this._max - this._min)) * 100;
    this._range.style.left = `${minPercent}%`;
    this._range.style.width = `${maxPercent - minPercent}%`;
  }

  _bindEvents() {
    this._thumbs.forEach((thumb) => {
      thumb.addEventListener('pointerdown', this._onThumbPointerDown);
    });
    this._container.addEventListener('pointerdown', this._onSliderPointerDown);
  }

  _unbindEvents() {
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);

    this._thumbs.forEach((thumb) => {
      thumb.removeEventListener('pointerdown', this._onThumbPointerDown);
    });
    this._container.removeEventListener(
      'pointerdown',
      this._onSliderPointerDown
    );
  }

  _bindGlobalEvents() {
    document.addEventListener('pointermove', this._onPointerMove);
    document.addEventListener('pointerup', this._onPointerUp);
  }

  _unbindGlobalEvents() {
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
  }

  _onThumbPointerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this._activeThumb = e.target.closest('[part="thumb"]');
    this._activeThumbIndex = parseInt(this._activeThumb.dataset.index);
    this._activeThumb.setAttribute('data-active', 'true');
    this._activeThumb.setPointerCapture(e.pointerId);

    this._bindGlobalEvents();
  }

  _onSliderPointerDown(e) {
    if (e.target.closest('[part="thumb"]')) return;

    e.preventDefault();
    const rect = this._container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));

    this._findClosestThumb(x);
    this._updateThumbPosition(x);

    if (this._activeThumb) {
      this._activeThumb.setPointerCapture(e.pointerId);
      this._bindGlobalEvents();
    }
  }

  _findClosestThumb(x) {
    const percentage = x / this._container.offsetWidth;
    const targetValue = this._min + percentage * (this._max - this._min);

    let closestIndex = 0;
    let minDistance = Math.abs(this._values[0] - targetValue);

    for (let i = 1; i < this._values.length; i++) {
      const distance = Math.abs(this._values[i] - targetValue);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    this._activeThumbIndex = closestIndex;
    this._activeThumb = this._thumbs[closestIndex];
    this._activeThumb.setAttribute('data-active', 'true');
  }

  _onPointerMove(e) {
    if (!this._activeThumb) return;

    const rect = this._container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));

    this._updateThumbPosition(x);
  }

  _updateThumbPosition(x) {
    const percentage = x / this._container.offsetWidth;
    let value = this._min + percentage * (this._max - this._min);

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
    this._updateFormValue();

    this.dispatchEvent(
      new CustomEvent('sliderChange', {
        detail: { values: this._values },
      })
    );
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

  _onPointerUp(e) {
    if (this._activeThumb) {
      this._activeThumb.removeAttribute('data-active');
      this._activeThumb.releasePointerCapture(e.pointerId);
      this._activeThumb = null;
      this._activeThumbIndex = null;

      this._unbindGlobalEvents();
    }
  }

  updateValues(options, reset = false) {
    this._min = options.min !== undefined ? options.min : this._min;
    this._max = options.max !== undefined ? options.max : this._max;
    this._step = options.step !== undefined ? options.step : this._step;
    this._decimals =
      options.decimals !== undefined ? options.decimals : this._decimals;

    if (reset) {
      const numValues = options.values
        ? options.values.length
        : this._values.length;
      this._values = this._getEvenlyDistributedValues(numValues);
    } else {
      this._values = (options.values || this._values)
        .map((val) => {
          return Math.max(this._min, Math.min(val, this._max));
        })
        .sort((a, b) => a - b);
    }

    this._render();
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
    this._updateFormValue();
  }

  _getEvenlyDistributedValues(numValues) {
    const values = [];

    if (numValues === 1) {
      values.push(this._min + (this._max - this._min) / 2);
    } else if (numValues === 2) {
      values.push(this._min, this._max);
    } else {
      const step = (this._max - this._min) / (numValues - 1);

      for (let i = 0; i < numValues; i++) {
        let value = this._min + step * i;

        value = Math.round(value / this._step) * this._step;
        value = parseFloat(value.toFixed(6));
        value = parseFloat(value.toFixed(this._decimals));
        value = Math.max(this._min, Math.min(value, this._max));

        values.push(value);
      }
    }

    return values.sort((a, b) => a - b);
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
      values: this._values,
    };
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Slider);
