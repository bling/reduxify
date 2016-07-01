import Promise from 'bluebird';

export default class Calculator {
  constructor() {
    this.val = 0;
  }

  getStateName() {
    return 'calculator';
  }

  getState() {
    return {
      val: this.val,
    };
  }

  rollback(state) {
    Object.assign(this, state);
  }

  add(val) {
    this.val += val;
  }

  multiply(val) {
    this.val *= val;
  }

  divide(val) {
    var that = this;
    return new Promise((resolve) => {
      that.val /= val;
      resolve();
    });
  }

  error(val) {
    return new Promise((resolve, reject) => reject('Ooops!'));
  }
}
