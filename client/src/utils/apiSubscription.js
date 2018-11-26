import io from 'socket.io-client';

const subscriptions = [];

const socket = io('http://localhost:3001');
socket.on('update', (scg) => {
  subscriptions.forEach(({ id, modelType, fn }) => {
    if(modelType === 'stageContainerGroup' && id === scg.id) {
      fn(scg);
    }
  })
});

const subscribe = (modelType, id, fn) => {
  return subscriptions.push({ modelType, id, fn });
}

const unsubscribe = (idx) => {
  subscriptions.slice(idx, 1);
}

export {
  subscribe,
  unsubscribe
}
