import io from 'socket.io-client';
import {apiUrl} from '../../config';
import apiQuery from './query';

const socket = io(apiUrl);
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
  return subscriptions.push({ query, modelType, id, fn });
}

const unsubscribe = (idx) => {
  subscriptions.slice(idx, 1);
}

export {
  subscribe,
  unsubscribe
}
