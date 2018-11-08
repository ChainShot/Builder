// takes in a function that returns an observable and
// returns a function that returns a promise 
export default function(fn) {
  return (...args) => {
    let observable = fn(...args);
    return new Promise((resolve, reject) => observable.subscribe(resolve, reject));
  }
}
