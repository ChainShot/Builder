import loadVote from './loadVote';
import toPromiseFunction from './toPromiseFunction';

// turn the loadVote observable into function returning a promise
let votePromiseFn = toPromiseFunction(loadVote);

async function stateUpdate(state, data) {
  
}

export default stateUpdate;
