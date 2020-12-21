import Dialog from '../components/Dialog';
import React from 'react';
import ReactDOM from 'react-dom';

let resolveFn;
const open = (Component = Dialog, props = {}) => {
  ReactDOM.render(<Component {...props}/>, document.getElementById('dialog'));
  return new Promise((resolve) => resolveFn = resolve);
}

const cancel = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('dialog'));
}

const close = (...params) => {
  ReactDOM.unmountComponentAtNode(document.getElementById('dialog'));
  resolveFn(...params);
}

export { open, close, cancel };
