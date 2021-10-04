/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/
import Model from './model';
import Event from './event';
import StringStore from './stringstore';
import ModelStore from './modelstore';

/**
 * Provider of data. In general, add provider to the controller using
 * the define method. Then for any component which is to be associated
 * with a provider, use the name of the provider.
 * @class
*/
export default class Provider extends EventTarget {
  constructor(model, origin) {
    super();

    // Set class properties
    this.$timer = null;

    if (!model) {
      // Allow empty model to fetch string data
      this.$store = new StringStore();
      // eslint-disable-next-line no-prototype-builtins
    } else if (model && Model.prototype.isPrototypeOf(model.prototype)) {
      this.$store = new ModelStore(model);
    } else {
      throw new Error('Provider: Invalid model');
    }
    if (typeof origin === 'string') {
      this.$origin = `/${origin.removePrefix('/')}`;
    } else if (!origin) {
      this.$origin = '/';
    } else {
      throw new Error('Provider: Invalid prefix');
    }
  }

  /**
   * Make a request on a periodic basis.
   */
  request(path, req, interval) {
    this.cancel();
    if (!this.$timer) {
      this.$fetch(path, req);
    }
    if (interval) {
      this.$timer = setInterval(this.$fetch.bind(this, path, req), interval);
    }
  }

  /**
  * Cancel any existing request interval timer.
  */
  cancel() {
    if (this.$timer) {
      clearTimeout(this.$timer);
      this.$timer = null;
    }
  }

  /**
   * Private method to fetch data
   */
  $fetch(path, req) {
    let status;
    let absurl = this.$origin + (path || '').removePrefix('/');
    if (!absurl.hasPrefix('/')) {
      absurl = `/${absurl}`;
    }
    this.dispatchEvent(new CustomEvent(Event.EVENT_START, {
      detail: absurl,
    }));
    fetch(absurl, req).then((response) => {
      status = response;
      const contentType = response.headers ? response.headers.get('Content-Type') || '' : '';
      switch (contentType.split(';')[0]) {
        case 'application/json':
        case 'text/json':
          return response.json();
        case 'text/plain':
        case 'text/html':
          return response.text();
        default:
          return response.blob();
      }
    }).then((data) => {
      if (!status.ok) {
        throw new Error(`${absurl} ${status.statusText} ${status.status}`);
      } else if (data instanceof Array) {
        this.$array(data);
      } else if (data instanceof Object) {
        this.$object(data);
      } else if (data instanceof String || typeof data === 'string') {
        this.$string(data);
      } else {
        throw Error(`Returned data is of type ${typeof (data)}`);
      }
    }).catch((error) => {
      this.dispatchEvent(new CustomEvent(Event.EVENT_ERROR, {
        detail: error,
      }));
    })
      .finally(() => {
        this.dispatchEvent(new CustomEvent(Event.EVENT_DONE, {
          detail: absurl,
        }));
      });
  }

  /**
   * Private method to process array of objects
   */
  $array(data) {
    data.forEach((object) => {
      this.$object(object);
    });
  }

  /**
   * Private method to process string
   */
  $string(data) {
    this.$store.object = data;
  }

  /**
   * Private method to process an object
   */
  $object(data) {
    this.$store.object = data;
  }
}
