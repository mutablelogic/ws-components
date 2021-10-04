/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

/**
 * Store for string data.
 * @class
*/
export default class StringStore {
  constructor(data) {
    this.$data = data;
  }

  // Set the object in the string store. Should
  // trigger a change event.
  set object(data) {
    if (data !== this.$data) {
      console.log(`obj=${data}`);
      this.$data = data;
    }
  }
}
