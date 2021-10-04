/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

import Provider from './core/provider';
import Event from './core/event';

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Page objects
  const nav = document.querySelector('wc-nav#lhnav');
  const body = document.querySelector('div#body');

  // Provider objects
  const provider = new Provider();

  // Navigation events
  nav.addEventListener(Event.EVENT_CLICK, (e) => {
    // Reload the page with the anchor as the name of the nav item
    const name = e.detail;
    if (name) {
      window.location.hash = `${name}`;
      provider.request(`${window.location.hash.removePrefix('#')}.html`);
    }
  });

  // Provider events
  provider.addEventListener(Event.EVENT_START, (e) => {
    console.log('Start', e.detail);
  });
  provider.addEventListener(Event.EVENT_DONE, (e) => {
    console.log('Done', e.detail);
  });
  provider.addEventListener(Event.EVENT_ERROR, (e) => {
    console.log('Error', e.detail);
  });
  provider.addEventListener(Event.EVENT_ADD, (e) => {
    body.innerHTML = e.detail;
  });
  provider.addEventListener(Event.EVENT_CHANGE, (e) => {
    body.innerHTML = e.detail;
  });

  // Make first request for 'introduction'
  provider.request(`${window.location.hash.removePrefix('#') || '01-introduction'}.html`);
});
