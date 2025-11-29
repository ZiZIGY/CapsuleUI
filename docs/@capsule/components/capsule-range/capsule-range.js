import { LitElement, html } from '../../lit';

class CapsuleRange extends LitElement {
  static formAssociated = true;

  static properties = {
    min: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
    step: { type: Number, reflect: true },
    decimals: { type: Number, reflect: true, attribute: 'decimals' },
    value: { type: String, reflect: true },
    orientation: { type: String, reflect: true },
    showTicks: { type: Boolean, reflect: true, attribute: 'show-ticks' },
    ticksDensity: {
      type: Number,
      reflect: true,
      attribute: 'ticks-density',
    },
    disabled: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._internals = this.attachInternals();
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
    this._activeThumbIndex = null;
    this._track = null;
    this._range = null;
    this._ticksContainer = null;

    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.decimals = 0;
    this.orientation = 'horizontal';
    this.showTicks = false;
    this.ticksDensity = 1;
    this.disabled = false;

    [
      '_onThumbPointerDown',
      '_onRangePointerDown',
      '_onPointerMove',
      '_onPointerUp',
    ].forEach((method) => (this[method] = this[method].bind(this)));
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  connectedCallback() {
    super.connectedCallback();
    this._parseAttributes();
    this._updateFormValue();
    this.setAttribute('role', 'slider');
    this.setAttribute('tabindex', '0');
  }

  firstUpdated() {
    this._track = this.shadowRoot?.querySelector('[part="track"]');
    this._range = this.shadowRoot?.querySelector('[part="range"]');
    this._ticksContainer = this.shadowRoot?.querySelector('[part="ticks"]');
    this._init();
  }

  updated(changedProperties) {
    if (this.shadowRoot) {
      if (
        changedProperties.has('min') ||
        changedProperties.has('max') ||
        changedProperties.has('step') ||
        changedProperties.has('decimals') ||
        changedProperties.has('value')
      ) {
        this._parseAttributes();
        this._fullUpdate();
      }

      if (
        changedProperties.has('orientation') ||
        changedProperties.has('showTicks') ||
        changedProperties.has('ticksDensity')
      ) {
        this._parseAttributes();
        this._fullUpdate();
      }

      if (changedProperties.has('disabled')) {
        this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unbindEvents();
  }

  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this._resetToEvenlyDistributedValues();
    this._fullUpdate();
  }

  _parseAttributes() {
    this._min = parseFloat(this.min) || 0;
    this._max = parseFloat(this.max) || 100;
    if (isNaN(this._min)) this._min = 0;
    if (isNaN(this._max)) this._max = 100;
    if (this._min >= this._max) this._max = this._min + 100;

    const valuesAttr = this.value;
    this._values = valuesAttr
      ? this._parseValues(valuesAttr)
      : [this._min, this._max];

    this._validateValues();

    this._step = parseFloat(this.step) || 1;
    this._decimals = parseInt(this.decimals) || 0;
    this._orientation =
      this.orientation === 'vertical' ? 'vertical' : 'horizontal';
    this._showTicks = this.showTicks || false;
    this._ticksDensity = parseInt(this.ticksDensity) || 1;
  }

  _parseValues(valuesAttr) {
    try {
      const parsed = JSON.parse(valuesAttr);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [this._min, this._max];
      }
      return parsed;
    } catch {
      return [this._min, this._max];
    }
  }

  _validateValues() {
    this._values = this._values
      .map((v) => {
        const num = parseFloat(v);
        return isNaN(num)
          ? this._min
          : Math.max(this._min, Math.min(num, this._max));
      })
      .sort((a, b) => a - b);

    if (this._values.length === 0) {
      this._values =
        this._values.length === 1 ? [this._min] : [this._min, this._max];
    }
  }

  _init() {
    this._initThumbs();
    this._updateRange();
    this._bindEvents();
    this._updateFormValue();
    if (this._showTicks) {
      this._renderTicks();
    }
  }

  _fullUpdate() {
    if (!this.shadowRoot) return;
    this._init();
  }

  _initThumbs() {
    if (!this.shadowRoot) return;

    // Remove existing thumbs
    this._thumbs.forEach((thumb) => thumb.remove());
    this._thumbs = [];

    // Create new thumbs
    this._values.forEach((value, index) => {
      const thumb = document.createElement('div');
      thumb.classList.add('thumb');
      thumb.part.add('thumb');
      thumb.dataset.index = index;

      const surface = document.createElement('div');
      surface.part.add('surface');

      thumb.appendChild(surface);
      this.shadowRoot.appendChild(thumb);
      this._thumbs[index] = thumb;
      this._positionThumb(index);
    });
  }

  _positionThumb(index) {
    const thumb = this._thumbs[index];
    if (!thumb) return;

    const percentage =
      ((this._values[index] - this._min) / (this._max - this._min)) * 100;
    const axis = this._orientation === 'horizontal' ? 'left' : 'bottom';

    thumb.style[axis] = `${percentage}%`;
  }

  _updateRange() {
    if (this._values.length === 0 || !this._range) return;

    let startPercent, endPercent;

    if (this._values.length === 1) {
      startPercent = 0;
      endPercent =
        ((this._values[0] - this._min) / (this._max - this._min)) * 100;
    } else {
      startPercent =
        ((Math.min(...this._values) - this._min) / (this._max - this._min)) *
        100;
      endPercent =
        ((Math.max(...this._values) - this._min) / (this._max - this._min)) *
        100;
    }

    if (this._orientation === 'horizontal') {
      this._range.style.left = `${startPercent}%`;
      this._range.style.width = `${endPercent - startPercent}%`;
    } else {
      this._range.style.setProperty('--top', `${100 - endPercent}%`);
      this._range.style.setProperty(
        '--height',
        `${endPercent - startPercent}%`
      );
    }
  }

  _renderTicks() {
    if (!this._showTicks || !this._ticksContainer) return;

    // Clear existing ticks
    this._ticksContainer.innerHTML = '';

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

  _bindEvents() {
    if (!this.shadowRoot) return;
    this._thumbs.forEach((thumb) =>
      thumb.addEventListener('pointerdown', this._onThumbPointerDown)
    );
    this.addEventListener('pointerdown', this._onRangePointerDown);
  }

  _unbindEvents() {
    document.removeEventListener('pointermove', this._onPointerMove);
    document.removeEventListener('pointerup', this._onPointerUp);
    if (this.shadowRoot) {
      this._thumbs.forEach((thumb) =>
        thumb.removeEventListener('pointerdown', this._onThumbPointerDown)
      );
    }
    this.removeEventListener('pointerdown', this._onRangePointerDown);
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
    if (this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this._activeThumb = e.target.closest('[part="thumb"]');
    this._activeThumbIndex = parseInt(this._activeThumb.dataset.index);
    this._activeThumb.setAttribute('data-active', 'true');
    this._activeThumb.setPointerCapture(e.pointerId);
    this._bindGlobalEvents();
  }

  _onRangePointerDown(e) {
    if (this.disabled) return;
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
    if (!this._activeThumb || this.disabled) return;

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

    // Update value attribute
    this.value = JSON.stringify(this._values);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { values: this._values },
        bubbles: true,
      })
    );
  }

  _preventOverlap() {
    const step = this._step;
    const min = this._min;
    const max = this._max;
    const n = this._values.length;
    const activeValue = this._values[this._activeThumbIndex];
    let values = [...this._values];

    values.sort((a, b) => a - b);

    values[0] = Math.max(min, values[0]);

    for (let i = 1; i < n; i++) {
      values[i] = Math.max(values[i], values[i - 1] + step);
    }
    values[n - 1] = Math.min(max, values[n - 1]);

    for (let i = n - 2; i >= 0; i--) {
      values[i] = Math.min(values[i], values[i + 1] - step);
    }

    values = values.map((v) =>
      parseFloat(
        (Math.round((v - min) / step) * step + min).toFixed(this._decimals)
      )
    );

    this._values = values;
    this._activeThumbIndex = values.indexOf(activeValue);
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

  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue(JSON.stringify(this._values));
    }
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
    this.value = JSON.stringify(this._values);
  }

  updateValues(options, reset = false) {
    this._min = options.min ?? this._min;
    this._max = options.max ?? this._max;
    this._step = options.step ?? this._step;
    this._decimals = options.decimals ?? this._decimals;
    this._orientation =
      options.orientation === 'vertical' ? 'vertical' : this._orientation;
    this._showTicks = options.showTicks ?? this._showTicks;
    this._ticksDensity = options.ticksDensity ?? this._ticksDensity;

    this.min = this._min;
    this.max = this._max;
    this.step = this._step;
    this.decimals = this._decimals;
    this.orientation = this._orientation;
    this.showTicks = this._showTicks;
    this.ticksDensity = this._ticksDensity;

    this._values = reset
      ? this._getEvenlyDistributedValues(options.values?.length)
      : (options.values ?? this._values)
          .map((v) => Math.max(this._min, Math.min(v, this._max)))
          .sort((a, b) => a - b);

    this.value = JSON.stringify(this._values);
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

  render() {
    return html`
      <div part="track"></div>
      <div part="range"></div>
      <div part="ticks"></div>
    `;
  }
}

customElements.define('capsule-range', CapsuleRange);
