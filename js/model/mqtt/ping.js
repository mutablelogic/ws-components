/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/
import Model from '../../core/model';

/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

/**
 * @class
 * Model defines properties
*/
export default class Ping extends Model {
  /**
   * @property
   * Return the name of the model
   *
   */
  static get name() {
    return 'Ping';
  }

  /**
   * @property
   * Return the properties of the model
   *
   */
  static get properties() {
    return {
      /**
       * The libmosquitto version
       * @type {string}
       */
      version: { type: String },

      /**
        * The broker
        * @type {string}
        */
      broker: { type: String },

      /**
        * The database name
        * @type {string}
        */
      database: { type: String },

      /**
        * The message retention time
        * @type {string}
        */
      retain: { type: String },

      /**
        * The broker connection time
        * @type {string}
        */
      connected: { type: String },

      /**
        * The message count
        * @type {string}
        */
      count: { type: Number },
    };
  }
}
