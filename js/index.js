/*
    js-components
    Web Components Design System
    github.com/mutablelogic/js-components
*/

// Global styles
import '../css/vars.css';
import '../css/document.css';

// Import favicon
import icon from '../assets/favicon/mu-756x756.png';

// Core
import Controller from './core/controller';
import Provider from './core/provider';
import Model from './core/model';
import Event from './core/event';

// Navigation Web Components
import './nav/wc-nav';
import './nav/wc-navbar';
import './nav/wc-nav-item';

// Grid Web Components
import './grid/wc-row';
import './grid/wc-col';

// Table components
import './table/wc-table';
import './table/wc-table-row';
import './table/wc-table-cell';

// Icons
import './icon/wc-icon';

// Extensions
import './extension/string';

// Set favicon
const link = document.querySelector("link[rel~='icon']");
if (link) {
  link.href = icon;
}

// Exports
export {
  Model, Controller, Provider, Event,
};
