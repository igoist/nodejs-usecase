// const module = require('module');

module.exports = class Square {
// exports.ss = class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};

