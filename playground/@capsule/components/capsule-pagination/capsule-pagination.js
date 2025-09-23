class Pagination extends HTMLElement {
  static observedAttributes = [
    'page',
    'total-pages',
    'items-per-page',
    'visible-pages',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._attachEvents();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const page = parseInt(this.getAttribute('page')) || 1;
    const totalPages = parseInt(this.getAttribute('total-pages')) || 1;
    const visiblePages = parseInt(this.getAttribute('visible-pages')) || 5;

    // Автоматически определяем что показывать на основе слотов
    const showEllipsis = this._hasSlotContent('ellipsis');
    const showFirstLast =
      this._hasSlotContent('first') || this._hasSlotContent('last');

    const pages = this._generatePages(
      page,
      totalPages,
      visiblePages,
      showEllipsis
    );

    this.shadowRoot.innerHTML = `
      <nav class="pagination" part="pagination" aria-label="Pagination">
        ${
          showFirstLast
            ? `
          <div class="page-item first" part="first-item">
            <slot name="first"></slot>
          </div>
        `
            : ''
        }

        <div class="page-item previous" part="prev-item">
          <slot name="previous"></slot>
        </div>

        <div class="pages-container" part="pages-container">
          ${pages
            .map((page) => {
              if (page === 'ellipsis') {
                return showEllipsis
                  ? `
                <div class="ellipsis" part="ellipsis">
                  <slot name="ellipsis">…</slot>
                </div>
              `
                  : '';
              }
              const isActive = page === parseInt(this.getAttribute('page'));
              return `
              <div class="page-item ${
                isActive ? 'active' : ''
              }" part="page-item">
                <button type="button" part="page-button" data-page="${page}">${page}</button>
              </div>
            `;
            })
            .join('')}
        </div>

        <div class="page-item next" part="next-item">
          <slot name="next"></slot>
        </div>

        ${
          showFirstLast
            ? `
          <div class="page-item last" part="last-item">
            <slot name="last"></slot>
          </div>
        `
            : ''
        }
      </nav>
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
    // Биндим события только если есть соответствующие слоты
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

  _generatePages(currentPage, totalPages, visiblePages, showEllipsis) {
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
      // Без эллипсиса - просто видимый диапазон
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  _goToPage(page) {
    this.setAttribute('page', page);
    this._dispatchChangeEvent(page);
  }

  _goToPrevious() {
    const currentPage = parseInt(this.getAttribute('page')) || 1;
    if (currentPage > 1) {
      this._goToPage(currentPage - 1);
    }
  }

  _goToNext() {
    const currentPage = parseInt(this.getAttribute('page')) || 1;
    const totalPages = parseInt(this.getAttribute('total-pages')) || 1;
    if (currentPage < totalPages) {
      this._goToPage(currentPage + 1);
    }
  }

  _goToFirst() {
    this._goToPage(1);
  }

  _goToLast() {
    const totalPages = parseInt(this.getAttribute('total-pages')) || 1;
    this._goToPage(totalPages);
  }

  _dispatchChangeEvent(page) {
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          page,
          totalPages: parseInt(this.getAttribute('total-pages')) || 1,
          itemsPerPage: parseInt(this.getAttribute('items-per-page')) || 10,
        },
        bubbles: true,
      })
    );
  }

  goToPage(page) {
    const totalPages = parseInt(this.getAttribute('total-pages')) || 1;
    if (page >= 1 && page <= totalPages) {
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
