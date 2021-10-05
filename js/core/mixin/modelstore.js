/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/
import Event from '../event';

/**
 * Mixin for storing string data.
 * @mixin
*/
const ModelStore = (Base) => class extends Base {
  constructor(model) {
    super();
    this.$model = model;
    this.$map = new Map();
  }

  /**
   * Set the object in the store. Should trigger an add, change or delete event.
   *
   * @param {object} data
   */
  set object(data) {
    this.dispatchEvent(new CustomEvent(Event.CHANGE, {
      detail: data,
    }));
  }
};

export default ModelStore;
