import Confirm from '../components/dialogs/Confirm';
import * as dialog from './dialog';
import React from 'react';
import ReactDOM from 'react-dom';

const closeHandler = (resolve, reject) => (success) => {
  if(success) resolve();
  else reject();
}

const confirm = (message = "") => {
  return new Promise((resolve, reject) => {
    const props = { onClose: closeHandler(resolve, reject), message }
    dialog.open(Confirm, props);
  });
}

export default confirm;
