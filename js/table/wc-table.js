import { LitElement, html, css } from 'lit';
import Model from '../core/model';

/**
 * A table element
 *
 * @slot - This element has a slot for a row definition
 */
window.customElements.define('wc-table', class extends LitElement {
  static get styles() {
    return css`
      :host table {
        width: 100%;
        margin: var(--table-margin-x) var(--table-margin-y);
        background-color: var(--table-background-color);
        color: var(--table-color);
        border: var(--table-border);
        border-collapse: collapse;
        vertical-align: var(--table-vertical-align);
      }
      :host slot {
        display: none;
      }
      `;
  }

  add(model) {
    // Where to insert the new element
    const table = this.shadowRoot.querySelector('tbody');
    if (!(table instanceof HTMLElement)) {
      throw Error('table must be an instance of HTMLElement');
    }

    // Replace or append the new element
    const elementId = Model.toElementId(this, model.key);
    const existingElement = this.shadowRoot.querySelector(`#${elementId}`);
    const template = this.$prototype();
    if (existingElement) {
      return existingElement;
    }
    template.id = elementId;
    table.appendChild(template);
    return template;
  }

  /**
    * Change a row in the table. This is exactly the same as the add method
    *
    */
  change(model) {
    return this.add(model);
  }

  /**
    * Delete a row from the table.
    *
    */
  delete(model) {
    // Get the existing element
    const elementId = Model.toElementId(this, model.key);
    const existingElement = document.getElementById(elementId);

    // Add to the template
    const table = this.shadowRoot.querySelector('tbody');
    if (!(table instanceof HTMLElement)) {
      throw Error('table must be an instance of HTMLElement');
    }
    if (existingElement) {
      table.remove(existingElement);
    }
    return existingElement;
  }

  /**
    * Return a prototype for a new row. There can only be one prototype
    * in a table, this method always returns the first HTMLElement.
    */
  $prototype() {
    const children = this.childNodes;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < children.length; i++) {
      if (children[i] instanceof HTMLElement) {
        return children[i].cloneNode(true);
      }
    }
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <table><tbody><slot></slot></tbody></table>
      `;
  }
});
