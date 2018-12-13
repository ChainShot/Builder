class Transaction {
  constructor() {
    this.stack = [];
  }

  add(fn) {
    this.stack.push(fn);
  }

  async revert() {
    while(this.stack.length > 0) {
      const fn = this.stack.pop();
      await fn();
    }
  }
}

module.exports = Transaction;
