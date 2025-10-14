export declare class Button extends HTMLElement {
  static formAssociated: boolean;
  constructor();
  disabled: boolean;
  type: string;
  readonly form: HTMLFormElement | null;
  click(): void;
  connectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void;
  static get observedAttributes(): string[];
}

declare global {
  interface HTMLElementTagNameMap {
    'capsule-button': Button;
  }
}
