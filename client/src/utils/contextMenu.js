import ContextMenu from '../components/ContextMenu';
import React from 'react';
import ReactDOM from 'react-dom';

const ANCHOR_ID = 'context-menu-anchor';
const ANCHOR_EL = document.getElementById(ANCHOR_ID);

let resolveFn;
const open = (Component, evt, componentProps = {}) => {
  const { clientX, clientY } = evt;
  // if the context menu is opened passed halfway across the viewport, show it from the other side
  // a negative x will tell the ContextMenu to render from the right instead of left
  const x = (clientX < window.innerWidth/2) ? clientX : (clientX - window.innerWidth);
  const Menu = (
    <ContextMenu x={x} y={clientY}>
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
