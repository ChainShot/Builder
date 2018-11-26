import api from './api';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
socket.on('hi', (socket) => {
  console.log('hi', socket)
});

const apiQuery = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ errors, data }) => {
    if(errors) {
      alert(JSON.stringify(errors));
    }
    return data;
  });
}

export default apiQuery;
