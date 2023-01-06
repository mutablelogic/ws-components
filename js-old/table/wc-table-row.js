/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import EventName from '../core/event';

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
      :host(:hover) {
        cursor: pointer;
        background-color: var(--table-background-color-hover);
      }
    `;
  }

  onClick(evt) {
    this.dispatchEvent(new CustomEvent(EventName.CLICK, {
      bubbles: true,
      composed: true,
      detail: {
        row: this,
        column: this.parentNodeNamed(evt.target, 'wc-table-cell'),
      },
    }));
  }

  parentNodeNamed(node, name) {
    // eslint-disable-next-line no-param-reassign
    name = name.toUpperCase();
    while (node && node.nodeName !== name) {
      // eslint-disable-next-line no-param-reassign
      node = node.parentNode;
    }
    return node;
  }

  render() {
    return html`
        <slot @click=${this.onClick}></slot>
      `;
  }
});
