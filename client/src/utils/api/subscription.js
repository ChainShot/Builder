import io from 'socket.io-client';
import {API_URL} from '../../config';
import apiQuery from './query';

const socket = io(API_URL);
const subscriptions = [];

socket.on('update', (_) => {
  subscriptions.forEach(({ query, id, modelType, fn }) => {
    if(_.modelType === modelType && _.id === id) {
      apiQuery(query, {id}).then(fn);
    }
  })
});

const subscribe = (query, id, modelType, fn) => {
  apiQuery(query, {id}).then(fn);
  return subscriptions.push({ query, modelType, id, fn }) - 1;
}

const unsubscribe = (idx) => {
  subscriptions.splice(idx, 1);
}

export {
  subscribe,
  unsubscribe
}
