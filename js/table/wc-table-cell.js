import { LitElement, html, css } from 'lit';

/**
 * A table cell element
 *
 * @slot - This element has a slot for cell contents
 */
window.customElements.define('wc-table-cell', class extends LitElement {
  static get styles() {
    return css`
      :host {
        display: table-cell;
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
