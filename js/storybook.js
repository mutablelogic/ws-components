/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

import Provider from './core/provider';
import Event from './core/event';
import MQTT from './model/mqtt';
import Controller from './core/controller';

// Define providers
Controller.define('mqtt', new Provider(MQTT.Ping, 'https://rpi4b.mutablelogic.com:8443/api/mqtt/'));
Controller.define('pages', new Provider());

// Bind to elements
Controller.bind('mqtt', document.querySelector('#mqtt'), (model, view) => {
  view.querySelector('#version').innerHTML = model.version;
  view.querySelector('#broker').innerHTML = model.broker;
  view.querySelector('#database').innerHTML = model.database;
  view.querySelector('#retain').innerHTML = model.retain;
  view.querySelector('#connected').innerHTML = model.connected;
  if (model.count >= 0) {
    view.querySelector('#count').innerHTML = model.count;
  }
});

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Page objects
  const nav = document.querySelector('wc-nav#lhnav');
  const body = document.querySelector('div#body');

  // Navigation events
  nav.addEventListener(Event.CLICK, (e) => {
    // Reload the page with the anchor as the name of the nav item
    const name = e.detail;
    if (name) {
      window.location.hash = `${name}`;
      Controller.pages.request(`storybook/${window.location.hash.removePrefix('#')}.html`);
      nav.active = name;
    }
  });

  // Provider events
  Controller.pages.addEventListener(Event.START, (e) => {
    console.log('Start', e.detail);
  });
  Controller.pages.addEventListener(Event.END, (e) => {
    console.log('End', e.detail);
  });
  Controller.pages.addEventListener(Event.ERROR, (e) => {
    console.log('Error', e.detail);
  });
  Controller.pages.addEventListener(Event.ADD, (e) => {
    console.log('Add');
    body.innerHTML = e.detail;
  });
  Controller.pages.addEventListener(Event.CHANGE, (e) => {
    console.log('Change');
    body.innerHTML = e.detail;
  });
  Controller.pages.addEventListener(Event.DELETE, () => {
    console.log('Delete');
    body.innerHTML = '';
  });

  // MQTT events
  Controller.mqtt.addEventListener(Event.ERROR, (e) => {
    console.log('MQTT Error', e.detail);
  });

  // Make request for MQTT provider
  Controller.mqtt.request('/', null, 1000 * 5);
});
