import io from 'socket.io-client';
import {API_URL} from '../../config';
import apiQuery from './query';
import uniqid from 'uniqid';

const socket = io(API_URL);
const subscriptions = [];

socket.on('update', (_) => {
  if(!_) return;
  subscriptions.forEach(({ query, id, modelType, fn, subId }) => {
    if(_.modelType === modelType && _.id === id) {
      // id unique to this modelType and subscription
      const subcriptionModelTypeId = `${modelType}-${subId}`;
      debounce(subcriptionModelTypeId, () => {
        apiQuery(query, {id}).then(fn);
      });
    }
  })
});

// debounces by a unique id
// from the leaning edge call until time has elapsed
// then, if called at least twice, call again on trailing edge
const timeouts = {};
const identity = () => {};
function debounce(id, callback, time = 500) {
  if(timeouts[id]) {
    // called at least twice,
    // catch the trailing edge
    console.log('call twice')
    timeouts[id] = callback;
  }
  else {
    // call the leaning edge callback
    callback();
    // set blank callback
    timeouts[id] = identity;
    // timeout until the next allowed call
    setTimeout(() => {
      // run callback if set
      timeouts[id]();
      // allow calls again
      delete timeouts[id];
    }, time);
  }
}

const subscribe = (query, id, modelType, fn) => {
  apiQuery(query, {id}).then(fn);
  return subscriptions.push({ query, modelType, id, fn, subId: uniqid() }) - 1;
}

const unsubscribe = (idx) => {
  subscriptions.splice(idx, 1);
}

export {
  subscribe,
  unsubscribe
}
