import Confirm from '../components/dialogs/Confirm';
import * as dialog from './dialog';

const closeHandler = (resolve, reject) => (success) => {
  if(success) resolve();
}

const confirm = (message = "") => {
  return new Promise((resolve, reject) => {
    const props = { onClose: closeHandler(resolve, reject), message }
    dialog.open(Confirm, props);
  });
}

export default confirm;
