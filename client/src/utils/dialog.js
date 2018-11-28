import Dialog from '../components/Dialog';
import React from 'react';
import ReactDOM from 'react-dom';

const open = (Component = Dialog, props = {}) => {
  ReactDOM.render(<Component {...props} />, document.getElementById('dialog'));
}

const close = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('dialog'));
}

export { open, close };
