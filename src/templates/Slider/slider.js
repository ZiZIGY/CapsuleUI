class Slider extends HTMLElement {
  static observedAttributes = [
    'min',
    'max',
    'step',
    'decimals',
    'values',
    'orientation',
    'show-ticks',
    'ticks-density',
  ];
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
    this._orientation = 'horizontal';
    this._showTicks = false;
    this._ticksDensity = 1;
    this._thumbs = [];
    this._activeThumb = null;

    // Bind methods
    [
      '_onThumbPointerDown',
      '_onSliderPointerDown',
      '_onPointerMove',
      '_onPointerUp',
    ].forEach((method) => (this[method] = this[method].bind(this)));
  }

  connectedCallback() {
    this._parseAttributes();
    this._render();
    this._init();
  }

  disconnectedCallback() {
    this._unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'orientation' && oldValue === newValue) return;

    this._parseAttributes();

    if (['orientation', 'show-ticks', 'ticks-density'].includes(name)) {
      this._fullUpdate();
    } else {
      name === 'orientation' ? this._updateRange() : this._fullUpdate();
    }
  }

  // Form methods
  formAssociatedCallback(form) {
    console.log('Form associated:', form);
  }

  formDisabledCallback(disabled) {
    this.style.opacity = disabled ? '0.5' : '1';
    this.style.pointerEvents = disabled ? 'none' : 'auto';
  }

  formResetCallback() {
    this._resetToEvenlyDistributedValues();
    this._fullUpdate();
  }

  // Private methods
  _parseAttributes() {
    this._min = parseFloat(this.getAttribute('min'));
    this._max = parseFloat(this.getAttribute('max'));
    this._step = parseFloat(this.getAttribute('step')) || 1;
    this._decimals = parseInt(this.getAttribute('decimals')) || 0;
    this._orientation =
      this.getAttribute('orientation') === 'vertical'
        ? 'vertical'
        : 'horizontal';
    this._showTicks = this.hasAttribute('show-ticks');
    this._ticksDensity = parseInt(this.getAttribute('ticks-density')) || 1;

    const valuesAttr = this.getAttribute('values');
    this._values = valuesAttr ? this._parseValues(valuesAttr) : [25, 75];

    this._calculateMinMax();
    this._validateValues();
  }

  _parseValues(valuesAttr) {
    try {
      return JSON.parse(valuesAttr);
    } catch {
      return [25, 75];
    }
  }

  _calculateMinMax() {
    if (this._min == null) this._min = Math.min(...this._values);
    if (this._max == null) this._max = Math.max(...this._values);
    if (this._min == null) this._min = 0;
    if (this._max == null) this._max = 100;
    if (this._min === this._max) this._max = this._min + 100;
  }

  _validateValues() {
    this._values = this._values
      .map((v) => Math.max(this._min, Math.min(v, this._max)))
      .sort((a, b) => a - b);

    if (this._values.length === 0) this._values = [this._min, this._max];
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        .thumb:hover > [part="ripples"],
        .thumb[data-active] > [part="ripples"] {
          transform: scale(2);
        }
      </style>
      <div part="track"></div>
      <div part="range"></div>
      <div part="ticks"></div>
    `;
    this._track = this.shadowRoot.querySelector('[part="track"]');
    this._range = this.shadowRoot.querySelector('[part="range"]');
    this._ticksContainer = this.shadowRoot.querySelector('[part="ticks"]');

    if (this._showTicks) {
      this._renderTicks();
    }
  }

  _renderTicks() {
    if (!this._showTicks || !this._ticksContainer) return;

    const ticksCount = Math.floor(
      (this._max - this._min) / this._step / this._ticksDensity
    );

    for (let i = 0; i <= ticksCount; i++) {
      const value = this._min + i * this._step * this._ticksDensity;
      if (value > this._max) break;

      const tick = document.createElement('div');
      tick.part.add('tick');

      const percentage = ((value - this._min) / (this._max - this._min)) * 100;

      if (this._orientation === 'horizontal') {
        tick.style.left = `${percentage}%`;
      } else {
        tick.style.bottom = `${percentage}%`;
      }

      this._ticksContainer.appendChild(tick);
    }
  }

  _init() {
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
    this._updateFormValue();
  }

  _fullUpdate() {
    this._render();
    this._init();
  }

  _initThumbs() {
    this._thumbs = [];

    this._values.forEach((value, index) => {
      const thumb = document.createElement('div');
      thumb.classList.add('thumb');
      thumb.part.add('thumb');
      thumb.dataset.index = index;

      const rippleContainer = document.createElement('div');
      rippleContainer.part.add('ripples');

      const label = document.createElement('div');
      label.part.add('label');
      label.textContent = this._formatValue(value);

      thumb.appendChild(rippleContainer);
      thumb.appendChild(label);

      this.shadowRoot.appendChild(thumb);
      this._thumbs[index] = thumb;
      this._positionThumb(index);
    });
  }

  _positionThumb(index) {
    const thumb = this._thumbs[index];
    const label = thumb.querySelector('[part="label"]');
    const percentage =
      ((this._values[index] - this._min) / (this._max - this._min)) * 100;
    const axis = this._orientation === 'horizontal' ? 'left' : 'bottom';

    thumb.style[axis] = label.style[axis] = `${percentage}%`;
    label.textContent = this._formatValue(this._values[index]);
  }

  _formatValue(value) {
    return value.toFixed(this._decimals);
  }

  _updateRange() {
    const minPercent =
      ((Math.min(...this._values) - this._min) / (this._max - this._min)) * 100;
    const maxPercent =
      ((Math.max(...this._values) - this._min) / (this._max - this._min)) * 100;

    if (this._orientation === 'horizontal') {
      this._range.style.left = `${minPercent}%`;
      this._range.style.width = `${maxPercent - minPercent}%`;
    } else {
      this._range.style.setProperty('--top', `${100 - maxPercent}%`);
      this._range.style.setProperty('--height', `${maxPercent - minPercent}%`);
    }
  }

  _bindEvents() {
    this._thumbs.forEach((thumb) =>
      thumb.addEventListener('pointerdown', this._onThumbPointerDown)
    );
    this.addEventListener('pointerdown', this._onSliderPointerDown);
  }

  _unbindEvents() {
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
    this._thumbs.forEach((thumb) =>
      thumb.removeEventListener('pointerdown', this._onThumbPointerDown)
    );
    this.removeEventListener('pointerdown', this._onSliderPointerDown);
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

    const rect = this.getBoundingClientRect();
    const isVertical = this._orientation === 'vertical';
    const position = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
    const size = isVertical ? rect.height : rect.width;
    const clampedPosition = Math.max(0, Math.min(position, size));

    this._findClosestThumb(clampedPosition, size, isVertical);
    this._updateThumbPosition(clampedPosition, size, isVertical);

    if (this._activeThumb) {
      this._activeThumb.setPointerCapture(e.pointerId);
      this._bindGlobalEvents();
    }
  }

  _findClosestThumb(position, size, isVertical) {
    const percentage = isVertical ? 1 - position / size : position / size;
    const targetValue = this._min + percentage * (this._max - this._min);

    const closestIndex = this._values.reduce(
      (closest, value, index) => {
        const distance = Math.abs(value - targetValue);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Math.abs(this._values[0] - targetValue) }
    ).index;

    this._activeThumbIndex = closestIndex;
    this._activeThumb = this._thumbs[closestIndex];
    this._activeThumb.setAttribute('data-active', 'true');
  }

  _onPointerMove(e) {
    if (!this._activeThumb) return;

    const rect = this.getBoundingClientRect();
    const isVertical = this._orientation === 'vertical';
    const position = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
    const size = isVertical ? rect.height : rect.width;
    const clampedPosition = Math.max(0, Math.min(position, size));

    this._updateThumbPosition(clampedPosition, size, isVertical);
  }

  _updateThumbPosition(position, size, isVertical) {
    const percentage = isVertical ? 1 - position / size : position / size;
    let value = this._min + percentage * (this._max - this._min);

    value = Math.round(value / this._step) * this._step;
    value = parseFloat(value.toFixed(6));
    value = parseFloat(value.toFixed(this._decimals));
    value = Math.max(this._min, Math.min(value, this._max));

    this._values[this._activeThumbIndex] = value;
    this._preventOverlap();

    this._values.forEach((_, index) => this._positionThumb(index));
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
    const activeValue = this._values[this._activeThumbIndex];

    this._values = sortedValues;
    this._activeThumbIndex = sortedValues.indexOf(activeValue);
    this._thumbs.forEach((thumb, index) => (thumb.dataset.index = index));
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

  _updateFormValue() {
    this.internals_.setFormValue(JSON.stringify(this._values));
  }

  _resetToEvenlyDistributedValues() {
    const numValues = this._values.length;

    if (numValues === 1) {
      this._values = [this._min + (this._max - this._min) / 2];
    } else if (numValues === 2) {
      this._values = [this._min, this._max];
    } else {
      const step = (this._max - this._min) / (numValues - 1);
      this._values = Array.from({ length: numValues }, (_, i) => {
        let value = this._min + step * i;
        value = Math.round(value / this._step) * this._step;
        value = parseFloat(value.toFixed(this._decimals));
        return Math.max(this._min, Math.min(value, this._max));
      });
    }

    this._values.sort((a, b) => a - b);
  }

  // Public methods
  updateValues(options, reset = false) {
    this._min = options.min ?? this._min;
    this._max = options.max ?? this._max;
    this._step = options.step ?? this._step;
    this._decimals = options.decimals ?? this._decimals;
    this._orientation =
      options.orientation === 'vertical' ? 'vertical' : this._orientation;
    this._showTicks = options.showTicks ?? this._showTicks;
    this._ticksDensity = options.ticksDensity ?? this._ticksDensity;

    this._values = reset
      ? this._getEvenlyDistributedValues(options.values?.length)
      : (options.values ?? this._values)
          .map((v) => Math.max(this._min, Math.min(v, this._max)))
          .sort((a, b) => a - b);

    this._fullUpdate();
  }

  _getEvenlyDistributedValues(numValues = this._values.length) {
    if (numValues === 1) return [this._min + (this._max - this._min) / 2];
    if (numValues === 2) return [this._min, this._max];

    const step = (this._max - this._min) / (numValues - 1);
    return Array.from({ length: numValues }, (_, i) => {
      let value = this._min + step * i;
      value = Math.round(value / this._step) * this._step;
      value = parseFloat(value.toFixed(this._decimals));
      return Math.max(this._min, Math.min(value, this._max));
    }).sort((a, b) => a - b);
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
      orientation: this._orientation,
      showTicks: this._showTicks,
      ticksDensity: this._ticksDensity,
    };
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Slider);
