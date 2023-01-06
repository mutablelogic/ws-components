import { LitElement, html, css } from 'lit';
import EventName from '../core/event';

/**
 * A button element
 *
 * @slot - The button's content
 */
window.customElements.define('wc-button', class extends LitElement {
  static get styles() {
    return css`
      :host button {
        display: inline-block;
        position: relative;
        padding: var(--button-padding-x) var(--button-padding-y);
        color: var(--button-color);
        background-color: var(--button-background-color);
        border: none;
        border-top-left-radius: var(--button-border-radius-left);
        border-bottom-left-radius: var(--button-border-radius-left);
        border-top-right-radius: var(--button-border-radius-right);
        border-bottom-right-radius: var(--button-border-radius-right);        
        font-size: var(--button-font-size);
        font-weight: var(--button-font-weight);
      }
      :host button:hover {
        cursor: pointer;
        color: var(--button-color-hover);
        background-color: var(--button-background-color-hover);
        font-weight: var(--button-font-weight-hover);
      }
      :host button:active {
        top: var(--button-offset-active); 
        left: var(--button-offset-active);           
        background-color: var(--button-background-color-active);
        color: var(--button-color-active);
        font-weight: var(--button-font-weight-active);
      }
      :host button.disabled {
        pointer-events: none;
        color: var(--button-color-disabled); 
        background-color: var(--button-background-color-disabled); 
        font-weight:  var(--button-font-weight-disabled);
      }      
      `;
  }

  static get properties() {
    return {
      /**
        * Name of the button to use when firing the wc-click event
        * @type {string}
        */
      name: { type: String },

      /**
       * Enabled or disabled button
       * @type {boolean}
       */
      disabled: { type: Boolean },
    };
  }

  render() {
    return html`
        <button @click=${this.onClick} ${this.disabled ? 'disabled' : ''}><slot></slot></button>
      `;
  }

  onClick() {
    this.dispatchEvent(new CustomEvent(EventName.CLICK, {
      bubbles: true,
      composed: true,
      detail: this.name || this.textContent,
    }));
  }
});
