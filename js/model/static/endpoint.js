/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/
import Model from '../../core/model';

/**
 * @class
 * Endpoint defines a static endpoint
*/
export default class Endpoint extends Model {
  /**
   * @property
   * Return the name of the model
   *
   */
  static get name() {
    return 'Endpoint';
  }

  /**
   * @property
   * Return the properties of the model
   *
   */
  static get properties() {
    return {
      /**
       * The name of the endpoint
       * @type {string}
       */
      name: { type: String },

      /**
        * The prefix for the endpoint
        * @type {string}
        */
      prefix: { type: String },
    };
  }

  // Return a key based on the name of the endpoint
  get key() {
    return this.name;
  }
}
