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
    return 'Event';
  }

  /**
   * @property
   * Return the properties of the model
   *
   */
  static get properties() {
    return {
      /**
       * The id of the event
       * @type {string}
       */
      id: { type: Number },

      /**
        * The timestamp of the event
        * @type {date}
        */
      ts: { type: Date },

      /**
        * The name for the emitter of the event
        * @type {string}
        */
      name: { type: String },

      /**
        * The value of the event
        * @type {object}
        */
      value: { type: Object },
    };
  }

  // Return a key based on the id of the event
  get key() {
    return `event-${this.id}`;
  }
}
