/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

/**
 * Store for object data.
 * @class
*/
export default class ModelStore {
  constructor(model) {
    this.$model = model;
    this.$map = new Map();
  }

  // Set an object in the model store. Should
  // trigger a change event on addition of a new object
  // or change of an existing object by key.
  // eslint-disable-next-line class-methods-use-this
  set object(data) {
    console.log(`obj=${data}`);
  }
}
