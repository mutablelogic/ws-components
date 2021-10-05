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
    return 'Message';
  }

  /**
   * @property
   * Return the properties of the model
   *
   */
  static get properties() {
    return {
      /**
       * The message id
       * @type {number}
       */
      id: { type: Number },

      /**
        * The message timestamp
        * @type {date}
        */
      ts: { type: String },

      /**
        * The message topic
        * @type {string}
        */
      topic: { type: String },

      /**
        * The message type
        * @type {string}
        */
      type: { type: String },

      /**
        * The message payload
        * @type {string}
        */
      payload: { type: String },

      /**
        * The message value
        * @type {object}
        */
      value: { type: Object },
    };
  }

  // Return a key based on id
  get key() {
    return this.id;
  }
}
