import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

const props = Object.getOwnPropertyNames(window)
  .filter((prop) => typeof global[prop] === 'undefined')
  .reduce((result, prop) => ({
    ...result,
    [prop]: Object.getOwnPropertyDescriptor(window, prop),
  }), {});

Object.defineProperties(global, props);
