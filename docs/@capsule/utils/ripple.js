// class Ripple extends HTMLElement {
//   constructor() {
//     super();
//     this._bound = false;
//     this._onDown = this._onDown.bind(this);
//     this._onUp = this._onUp.bind(this);

//     this.attachShadow({ mode: 'open' });
//     this._render();
//   }

//   _render() {
//     this.shadowRoot.innerHTML = `
//       <style>
//         :host {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           pointer-events: none;
//           overflow: hidden;
//         }
//         span {
//           position: absolute;
//           border-radius: 50%;
//           background-color: var(--capsule-ripple-color);
//           pointer-events: none;
//           transform: scale(0);
//           transition: 0.3s linear;
//         }
//         :host::part(ripple grow) {
//           transform: scale(0);
//           animation: ripple-grow 1s ease-out forwards;
//         }
//         :host::part(ripple fade) {
//           opacity: 0;
//           transition: opacity 0.5s ease-out;
//         }

//         @keyframes ripple-grow {
//           to {
//             transform: scale(4);
//           }
//         }
//         @keyframes ripple-fade {
//           to {
//             opacity: 0;
//           }
//         }
//       </style>
//     `;
//   }

//   connectedCallback() {
//     this._bindToParent();
//   }

//   disconnectedCallback() {
//     this._unbindFromParent();
//   }

//   _parent() {
//     return this.parentElement || this.getRootNode()?.host || null;
//   }

//   _ensureParentPositioned() {
//     const parent = this._parent();
//     if (!parent) return;
//     const style = window.getComputedStyle(parent);
//     if (style.position === 'static') {
//       parent.style.position = 'relative';
//     }
//   }

//   _bindToParent() {
//     if (this._bound) return;
//     const parent = this._parent();
//     if (!parent) return;
//     this._ensureParentPositioned();
//     parent.addEventListener('pointerdown', this._onDown);
//     parent.addEventListener('pointerup', this._onUp);
//     parent.addEventListener('pointerleave', this._onUp);
//     parent.addEventListener('pointercancel', this._onUp);
//     this._bound = true;
//   }

//   _unbindFromParent() {
//     const parent = this._parent();
//     if (!parent || !this._bound) return;
//     parent.removeEventListener('pointerdown', this._onDown);
//     parent.removeEventListener('pointerup', this._onUp);
//     parent.removeEventListener('pointerleave', this._onUp);
//     parent.removeEventListener('pointercancel', this._onUp);
//     this._bound = false;
//   }

//   _onDown(event, isKeyboard = false) {
//     const parent = this._parent();
//     if (!parent || parent.hasAttribute?.('disabled')) return;
//     const diameter = Math.max(parent.clientWidth, parent.clientHeight);
//     const radius = diameter / 2;
//     const rect = parent.getBoundingClientRect();

//     const ripple = document.createElement('span');
//     ripple.part.add('ripple', 'grow');
//     ripple.setAttribute('data-grow', '');

//     const x = isKeyboard ? rect.width / 2 : event.clientX - rect.left;
//     const y = isKeyboard ? rect.height / 2 : event.clientY - rect.top;

//     ripple.style.left = `${x - radius}px`;
//     ripple.style.top = `${y - radius}px`;
//     ripple.style.width = ripple.style.height = `${diameter}px`;
//     this.shadowRoot.appendChild(ripple);
//   }

//   _onUp() {
//     let ripple = this.shadowRoot.querySelector('*:last-child');

//     if (ripple) {
//       ripple.part.add('fade');
//       ripple.setAttribute('data-fade', '');
//       ripple.addEventListener('transitionend', () => ripple.remove(), {
//         once: true,
//       });
//     }
//   }
// }

// customElements.define('capsule-ripple', Ripple);
