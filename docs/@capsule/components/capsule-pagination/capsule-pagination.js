import { LitElement, html } from '../../lit';

class CapsulePagination extends LitElement {
  static properties = {
    page: { type: Number, reflect: true },
    totalPages: { type: Number, reflect: true, attribute: 'total-pages' },
    itemsPerPage: { type: Number, reflect: true, attribute: 'items-per-page' },
    showBoundaryPages: {
      type: Boolean,
      reflect: true,
      attribute: 'show-boundary-pages',
    },
    size: { type: String, reflect: true },
    variant: { type: String, reflect: true },
    color: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.page = 1;
    this.totalPages = 1;
    this.itemsPerPage = 5;
    this.showBoundaryPages = false;
    this.size = 'md';
    this.variant = '';
    this.color = '';
    this._slotBoundElements = new WeakSet();
    this._handleSlotChange = this._handleSlotChange.bind(this);
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Pagination');
    this._updateDataAttributes();
    this._attachSlotEvents();
  }

  updated(changedProperties) {
    if (changedProperties.has('page') || changedProperties.has('totalPages')) {
      this._updateDataAttributes();
    }
  }

  firstUpdated() {
    this._attachSlotEvents();
  }

  render() {
    const showEllipsis = this._hasSlotContent('ellipsis');
    const showFirstLast =
      this._hasSlotContent('first') || this._hasSlotContent('last');

    const pages = this._generatePages(
      this.page,
      this.totalPages,
      this.itemsPerPage,
      showEllipsis,
      this.showBoundaryPages
    );

    return html`
      ${showFirstLast
        ? html`<slot name="first" part="first-item" @slotchange=${this._handleSlotChange}></slot>`
        : ''}
      <slot
        name="previous"
        part="prev-item"
        @slotchange=${this._handleSlotChange}
      ></slot>

      <div class="pages-container" part="pages-container">
        ${pages.map((pageNum) => {
          if (pageNum === 'ellipsis') {
            return showEllipsis
              ? html`
                  <div class="ellipsis" part="ellipsis">
                    <slot name="ellipsis">…</slot>
                  </div>
                `
              : '';
          }
          const isActive = pageNum === this.page;
          return html`
            <button
              type="button"
              part="page-item ${isActive ? 'active' : ''}"
              data-page="${pageNum}"
              @click=${() => this._goToPage(pageNum)}
            >
              ${pageNum}
            </button>
          `;
        })}
      </div>

      <slot
        name="next"
        part="next-item"
        @slotchange=${this._handleSlotChange}
      ></slot>
      ${showFirstLast
        ? html`<slot name="last" part="last-item" @slotchange=${this._handleSlotChange}></slot>`
        : ''}
    `;
  }

  _hasSlotContent(slotName) {
    return this.querySelector(`[slot="${slotName}"]`) !== null;
  }

  _handleSlotChange(event) {
    const slot = event.target;
    const slotName = slot.name;
    this._bindSlotEvent(slotName, slot);
  }

  _attachSlotEvents() {
    if (this._hasSlotContent('first')) {
      const slot = this.shadowRoot?.querySelector('slot[name="first"]');
      if (slot) this._bindSlotEvent('first', slot);
    }

    if (this._hasSlotContent('last')) {
      const slot = this.shadowRoot?.querySelector('slot[name="last"]');
      if (slot) this._bindSlotEvent('last', slot);
    }

    const prevSlot = this.shadowRoot?.querySelector('slot[name="previous"]');
    if (prevSlot) this._bindSlotEvent('previous', prevSlot);

    const nextSlot = this.shadowRoot?.querySelector('slot[name="next"]');
    if (nextSlot) this._bindSlotEvent('next', nextSlot);
  }

  _bindSlotEvent(slotName, slot) {
    const bindElements = () => {
      const elements = slot.assignedElements();
      elements.forEach((element) => {
        if (!this._slotBoundElements.has(element)) {
          let handler;
          switch (slotName) {
            case 'first':
              handler = () => this._goToFirst();
              break;
            case 'last':
              handler = () => this._goToLast();
              break;
            case 'previous':
              handler = () => this._goToPrevious();
              break;
            case 'next':
              handler = () => this._goToNext();
              break;
          }
          if (handler) {
            element.addEventListener('click', handler);
            this._slotBoundElements.add(element);
          }
        }
      });
    };

    bindElements();
    if (!slot.hasAttribute('data-bound')) {
      slot.setAttribute('data-bound', '');
      slot.addEventListener('slotchange', bindElements);
    }
  }

  _generatePages(
    currentPage,
    totalPages,
    visiblePages,
    showEllipsis,
    showBoundaryPages
  ) {
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (showEllipsis) {
      if (showBoundaryPages) {
        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) pages.push('ellipsis');
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else {
        if (startPage > 1) {
          pages.push('ellipsis');
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (endPage < totalPages) {
          pages.push('ellipsis');
        }
      }
    } else {
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  _updateDataAttributes() {
    const currentPage = Number(this.page) || 1;
    const totalPages = Number(this.totalPages) || 1;

    if (currentPage === 1) {
      this.setAttribute('data-on-first-page', '');
    } else {
      this.removeAttribute('data-on-first-page');
    }

    if (currentPage === totalPages) {
      this.setAttribute('data-on-last-page', '');
    } else {
      this.removeAttribute('data-on-last-page');
    }
  }

  _goToPage(page) {
    const pageNum = Number(page);
    const total = Number(this.totalPages) || 1;
    if (pageNum >= 1 && pageNum <= total) {
      this.page = pageNum;
      this._dispatchChangeEvent(pageNum);
    }
  }

  _goToPrevious() {
    const currentPage = Number(this.page) || 1;
    if (currentPage > 1) {
      this._goToPage(currentPage - 1);
    }
  }

  _goToNext() {
    const currentPage = Number(this.page) || 1;
    const totalPages = Number(this.totalPages) || 1;
    if (currentPage < totalPages) {
      this._goToPage(currentPage + 1);
    }
  }

  _goToFirst() {
    this._goToPage(1);
  }

  _goToLast() {
    const totalPages = Number(this.totalPages) || 1;
    this._goToPage(totalPages);
  }

  _dispatchChangeEvent(page) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          page,
          totalPages: Number(this.totalPages) || 1,
          itemsPerPage: Number(this.itemsPerPage) || 10,
        },
        bubbles: true,
      })
    );
  }

  goToPage(page) {
    this._goToPage(page);
  }

  nextPage() {
    this._goToNext();
  }

  previousPage() {
    this._goToPrevious();
  }
}

customElements.define('capsule-pagination', CapsulePagination);
