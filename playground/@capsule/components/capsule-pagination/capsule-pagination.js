class Pagination extends HTMLElement {
  static observedAttributes = [
    'page',
    'total-pages',
    'items-per-page',
    'show-boundary-pages',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._currentPage = 1;
    this._totalPages = 1;
  }

  connectedCallback() {
    this._updateFromAttributes();
    this._render();
    this._attachEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    this._updateFromAttributes();
    this._render();
  }

  _updateFromAttributes() {
    this._currentPage = parseInt(this.getAttribute('page')) || 1;
    this._totalPages = parseInt(this.getAttribute('total-pages')) || 1;

    // Обновляем data-атрибуты без триггера render
    if (this._currentPage === 1) {
      this.setAttribute('data-on-first-page', '');
    } else {
      this.removeAttribute('data-on-first-page');
    }

    if (this._currentPage === this._totalPages) {
      this.setAttribute('data-on-last-page', '');
    } else {
      this.removeAttribute('data-on-last-page');
    }
  }

  _render() {
    const showBoundaryPages = this.hasAttribute('show-boundary-pages');
    const itemsPerPage = parseInt(this.getAttribute('items-per-page')) || 5;

    // Автоматически определяем что показывать на основе слотов
    const showEllipsis = this._hasSlotContent('ellipsis');
    const showFirstLast =
      this._hasSlotContent('first') || this._hasSlotContent('last');

    const pages = this._generatePages(
      this._currentPage,
      this._totalPages,
      itemsPerPage,
      showEllipsis,
      showBoundaryPages
    );

    this.shadowRoot.innerHTML = `
        ${showFirstLast ? `<slot name="first" part="first-item"></slot>` : ''}
        <slot name="previous" part="prev-item"></slot>

        <div class="pages-container" part="pages-container">
          ${pages
            .map((page) => {
              if (page === 'ellipsis') {
                return showEllipsis
                  ? `<div class="ellipsis" part="ellipsis"><slot name="ellipsis">…</slot></div>`
                  : '';
              }
              const isActive = page === this._currentPage;
              return `
                <button type="button" part="page-item ${
                  isActive ? 'active' : ''
                }" data-page="${page}">
                  ${page}
                </button>
              `;
            })
            .join('')}
        </div>

        <slot name="next" part="next-item"></slot>
        ${showFirstLast ? `<slot name="last" part="last-item"></slot>` : ''}
    `;

    this._bindPageEvents();
  }

  _hasSlotContent(slotName) {
    return this.querySelector(`[slot="${slotName}"]`) !== null;
  }

  _bindPageEvents() {
    const pageButtons = this.shadowRoot.querySelectorAll('button[data-page]');
    pageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const page = parseInt(button.dataset.page);
        this._goToPage(page);
      });
    });
  }

  _attachEvents() {
    if (this._hasSlotContent('first')) {
      this._bindSlotEvent('first', () => this._goToFirst());
    }

    if (this._hasSlotContent('last')) {
      this._bindSlotEvent('last', () => this._goToLast());
    }

    this._bindSlotEvent('previous', () => this._goToPrevious());
    this._bindSlotEvent('next', () => this._goToNext());
  }

  _bindSlotEvent(slotName, handler) {
    const slot = this.shadowRoot.querySelector(`slot[name="${slotName}"]`);
    if (slot) {
      const bindElements = () => {
        slot.assignedElements().forEach((element) => {
          if (!element._bound) {
            element.addEventListener('click', handler);
            element._bound = true;
          }
        });
      };

      bindElements();
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

  _goToPage(page) {
    // Используем requestAnimationFrame чтобы избежать рекурсии
    requestAnimationFrame(() => {
      this.setAttribute('page', page);
      this._dispatchChangeEvent(page);
    });
  }

  _goToPrevious() {
    if (this._currentPage > 1) {
      this._goToPage(this._currentPage - 1);
    }
  }

  _goToNext() {
    if (this._currentPage < this._totalPages) {
      this._goToPage(this._currentPage + 1);
    }
  }

  _goToFirst() {
    this._goToPage(1);
  }

  _goToLast() {
    this._goToPage(this._totalPages);
  }

  _dispatchChangeEvent(page) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          page,
          totalPages: this._totalPages,
          itemsPerPage: parseInt(this.getAttribute('items-per-page')) || 10,
        },
        bubbles: true,
      })
    );
  }

  goToPage(page) {
    if (page >= 1 && page <= this._totalPages) {
      this._goToPage(page);
    }
  }

  nextPage() {
    this._goToNext();
  }

  previousPage() {
    this._goToPrevious();
  }
}

customElements.define('capsule-pagination', Pagination);
