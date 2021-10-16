/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

import Provider from './core/provider';
import Static from './model/static';
import Events from './model/events';
import Controller from './core/controller';

import E from './core/event';

// Define navigation titles
const NAVBAR = {
  '/dev': 'Development',
  'events-frontend': 'Events',
};

// Define providers
Controller.define('navbar', new Provider(Static.Endpoint, '/api/static'));
Controller.define('events', new Provider(Events.Event, '/api/events'));

// Bind to navbar items
Controller.bind('navbar', document.querySelector('#nav'), (model, view) => {
  let a = view.querySelector('a');
  if (!a) {
    a = view.appendChild(document.createElement('a'));
  }
  a.href = model.prefix;
  a.textContent = NAVBAR[model.name] || model.name;
});

// Bind to events table view
Controller.bind('events', document.querySelector('#events'), (model, view) => {
  const timeStamp = new Date(model.ts);
  view.querySelector('#ts').textContent = timeStamp.toLocaleString();
  view.querySelector('#name').textContent = `${model.name} [${model.id}]`;
  view.querySelector('#value').textContent = JSON.stringify(model.value);
});

// Display error message if provider fails
Controller.events.addEventListener(E.ERROR, (evt) => {
  const toast = document.querySelector('#toast');
  toast.querySelector('#toast-body').innerText = evt.detail;
  toast.setAttribute('show', '');
});
Controller.navbar.addEventListener(E.ERROR, (evt) => {
  const toast = document.querySelector('#toast');
  toast.querySelector('#toast-body').innerText = evt.detail;
  toast.setAttribute('show', '');
});

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Make request for adding and removing navigation bar elements
  Controller.navbar.request('/', null, 1000 * 30);
  // Get events
  Controller.events.request('/', null, 1000 * 5);

  const toast = document.querySelector('#toast');
  toast.addEventListener(E.SHOW, (evt) => {
    console.log('toast shown', evt);
  });
  toast.addEventListener(E.HIDE, (evt) => {
    console.log('toast hidden', evt);
  });
});
