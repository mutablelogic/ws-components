import { LitElement, html, css } from 'lit';
import Event from '../core/event';

/**
 * A modal window
 *
 * @slot - This element has a slot for any element as contents of the modal
 */
window.customElements.define('wc-modal', class extends LitElement {
  static get properties() {
    return {
      /**
       * The background color
       * @type {string}
       */
      bg: { type: String },

      /**
       * The text color
       * @type {string}
       */
      color: { type: String },

      /**
       * Show modal
       * @type {boolean}
       */
      show: { type: Boolean },

    };
  }

  static get styles() {
    return css`
      :host div {
        position: fixed; 
        z-index: var(--modal-zindex);
        left: 0; 
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: none;
        outline: 0;
        background-color: var(--modal-backdrop-color);        
      }
      :host div slot {
        position: relative; 
        display: flex;
        flex-direction: column;
        width: auto;
        outline: 0;        
        margin: var(--modal-margin);
        padding: var(--modal-padding);
        color: var(--modal-color);
        background-color: var(--modal-background-color);
        background-clip: padding-box;
        border: var(--modal-border);
        border-radius: var(--modal-border-radius);
      }`;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    const div = this.shadowRoot.querySelector('div');
    if (name === 'show' && this.hasAttribute('show')) {
      div.style.display = 'block';
    } else {
      div.style.display = 'none';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener(Event.CLICK, this.doClick.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener(Event.CLICK, this.doClick.bind(this));
    super.disconnectedCallback();
  }

  doClick(evt) {
    // If detail is Event.Close, then close the toast
    if (evt.detail === Event.CLOSE) {
      this.removeAttribute('show');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <div><slot></slot></div>
      `;
  }
});
