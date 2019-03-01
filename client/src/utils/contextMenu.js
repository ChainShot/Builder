import ContextMenu from '../components/ContextMenu';
import React from 'react';
import ReactDOM from 'react-dom';

const ANCHOR_ID = 'context-menu-anchor';
const ANCHOR_EL = document.getElementById(ANCHOR_ID);

let resolveFn;
const open = (Component, { x, y }, componentProps = {}) => {
  const Menu = (
    <ContextMenu x={x} y={y}>
      <Component {...componentProps}/>
    </ContextMenu>
  )
  ReactDOM.render(Menu, ANCHOR_EL);
  return new Promise((resolve) => resolveFn = resolve);
}

const cancel = () => {
  ReactDOM.unmountComponentAtNode(ANCHOR_EL);
}

const close = (...params) => {
  ReactDOM.unmountComponentAtNode(ANCHOR_EL);
  resolveFn(...params);
}

export { open, close, cancel };
