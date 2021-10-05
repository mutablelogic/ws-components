/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

import Provider from './core/provider';
import Event from './core/event';
import MQTT from './model/mqtt';

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Page objects
  const nav = document.querySelector('wc-nav#lhnav');
  const body = document.querySelector('div#body');

  // Provider objects
  const provider = new Provider();
  const mqtt = new Provider(MQTT.Ping, 'https://rpi4b.mutablelogic.com:8443/api/mqtt/');

  // Navigation events
  nav.addEventListener(Event.CLICK, (e) => {
    // Reload the page with the anchor as the name of the nav item
    const name = e.detail;
    if (name) {
      window.location.hash = `${name}`;
      provider.request(`storybook/${window.location.hash.removePrefix('#')}.html`);
      nav.active = name;
    }
  });

  // Provider events
  provider.addEventListener(Event.START, (e) => {
    console.log('Start', e.detail);
  });
  provider.addEventListener(Event.END, (e) => {
    console.log('End', e.detail);
  });
  provider.addEventListener(Event.ERROR, (e) => {
    console.log('Error', e.detail);
  });
  provider.addEventListener(Event.ADD, (e) => {
    console.log('Add');
    body.innerHTML = e.detail;
  });
  provider.addEventListener(Event.CHANGE, (e) => {
    console.log('Change');
    body.innerHTML = e.detail;
  });
  provider.addEventListener(Event.DELETE, () => {
    console.log('Delete');
    body.innerHTML = '';
  });

  // MQTT events
  mqtt.addEventListener(Event.START, (e) => {
    console.log('MQTT Start', e.detail);
  });
  mqtt.addEventListener(Event.END, (e) => {
    console.log('MQTT End', e.detail);
  });
  mqtt.addEventListener(Event.ERROR, (e) => {
    console.log('MQTT Error', e.detail);
  });
  mqtt.addEventListener(Event.ADD, (e) => {
    console.log(`MQTT Add ${e.detail}`);
  });
  mqtt.addEventListener(Event.CHANGE, (e) => {
    console.log(`MQTT Change ${e.detail} ${e.detail.key}`);
  });
  mqtt.addEventListener(Event.DELETE, (e) => {
    console.log(`MQTT Delete ${e.detail}`);
  });

  // Make first request for 'introduction'
  provider.request(`${window.location.hash.removePrefix('#') || '01-introduction'}.html`);

  // Make request for MQTT provider
  mqtt.request('/', null, 1000 * 5);
});
