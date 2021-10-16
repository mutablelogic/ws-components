import { LitElement, html, css } from 'lit';
import icons from 'bootstrap-icons/bootstrap-icons.svg';
import Event from '../core/event';

/**
 * A close button element
 *
 */
window.customElements.define('wc-close-button', class extends LitElement {
  static get styles() {
    return css`
      :host div {
        position: absolute;
        right: 0;
        top: 0;
        margin: var(--button-close-margin-x) var(--button-close-margin-y);
      }
      :host div button {
        cursor: pointer;
        background: transparent;
        border: none;
        padding: var(--button-close-padding);
        color: var(--button-close-color);
      }
      :host div button:hover {
        color: var(--button-close-color-hover);
      }
      :host div button:active {
        color: var(--button-close-color-active);
      }
      `;
  }

  static get properties() {
    return {
      /**
       * Name of the icon to display
       * @type {string}
       */
      name: { type: String },

      /**
       * Size of the icon to display
       * @type {string}
       */
      size: { type: String },

      /**
       * Enabled or disabled button
       * @type {boolean}
       */
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.name = 'x-lg';
    this.size = '1.5em';
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <div>
          <button @click=${this.onClick} ${this.disabled ? 'disabled' : ''}>
            <svg style="width: ${this.size}; height: ${this.size};" fill="currentColor"><use href="${icons}#${this.name}"/></svg>
          </button>
        </div>
      `;
  }

  onClick() {
    this.dispatchEvent(new CustomEvent(Event.CLICK, {
      bubbles: true,
      composed: true,
      detail: Event.CLOSE,
    }));
  }
});
