import { LitElement, html, css } from 'lit';

/**
 * A table element
 *
 * @slot - This element has a slot for a row definition
 */
window.customElements.define('wc-table-row', class extends LitElement {
  static get styles() {
    return css`
      :host {
        display: table-row;
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <slot></slot>
      `;
  }
});
