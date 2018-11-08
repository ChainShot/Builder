import { Observable } from './zen-observable';
import { getData } from './mockData';

var handler = {
    get: function(obj, prop) {
      if(prop === 'call') {
        return (method, voteId) => {
          if(method === 'votes') {
            return new Observable(function (obs) { 
              let vote = getData().votes.filter(x => x.id === voteId)[0];
              if(!vote) throw new Error(`Could not find a vote with id ${voteId}`);
              obs.next({ 
                yes: vote.yes.toString(),
                no: vote.no.toString(),
                creator: vote.creator,
                question: vote.question,
              });
            });
          }
          else {
            throw new Error(`Expected you to lookup 'votes', got: '${method}'`)
          }
        }
      }
      else {
        throw new Error(`Expected you to use method 'call', got: ${prop}`)
      }
    }
};

var p = new Proxy({}, handler);

export default p;
