import { LitElement, html, css } from 'lit';
import EventName from '../core/event';

// Default toast visibility duration, in milliseconds
const DEFAULT_DURATION = 5000;

/**
 * A toast element
 *
 * @slot - This element has a slot for the contents of the toast
 */
window.customElements.define('wc-toast', class extends LitElement {
  constructor() {
    super();
    this.$timer = null;
    this.duration = DEFAULT_DURATION;
  }

  static get properties() {
    return {
      /**
       * Show the toast
       * @type {boolean}
       */
      show: { type: Boolean },

      /**
       * Duration for the toast to persist, in milliseconds
       * @type {number}
       */
      duration: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host div {
        display: none;
        visibility: hidden;
        min-width: var(--toast-min-width);
        margin-left: calc(-1 * var(--toast-min-width) / 2);
        background-color: var(--toast-background-color);
        color: var(--toast-color);
        border: var(--toast-border);
        border-radius: var(--toast-border-radius);
        padding: var(--toast-padding-x) var(--toast-padding-y);
        position: fixed;
        z-index: var(--toast-zindex);
        left: 50%; /* Center the snackbar */
        bottom: 30px; /* 30px from the bottom */
      }
      :host div.show {
        display: block;
        visibility: visible;
        opacity: var(--toast-opacity);
        animation: fadein var(--toast-fade-time);
      }
      :host div.hide {        
        animation: fadeout 2s;
      }
      @keyframes fadein {
        from { opacity: 0; }
        to { opacity: var(--toast-opacity); }
      }
      @keyframes fadeout {
        from { opacity: var(--toast-opacity); }
        to { opacity: 0; }
      }
      `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener(EventName.CLICK, this.doClick.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener(EventName.CLICK, this.doClick.bind(this));
    super.disconnectedCallback();
  }

  doClick(evt) {
    // If detail is EventName.Close, then close the toast
    if (evt.detail === EventName.CLOSE) {
      this.removeAttribute('show');
    }
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    const div = this.shadowRoot ? this.shadowRoot.querySelector('div') : null;
    if (name === 'show' && this.hasAttribute('show')) {
      // Add show class
      if (div) {
        div.classList.add('show');
        div.classList.remove('hide');
      }

      // Set hide timer
      clearTimeout(this.$timer);
      this.$timer = setTimeout(() => {
        this.removeAttribute('show');
      }, this.duration || DEFAULT_DURATION);

      // Dispatch event
      this.dispatchEvent(new CustomEvent(EventName.SHOW, {
        bubbles: true,
        composed: true,
      }));
    } else {
      // Remove the class
      this.$timer = null;
      if (div) {
        div.classList.add('hide');
        div.classList.remove('show');
      }

      // Dispatch event
      this.dispatchEvent(new CustomEvent(EventName.HIDE, {
        bubbles: true,
        composed: true,
      }));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <div><slot></slot></div>
      `;
  }
});
