const storage = require('node-persist');
const path = require('path');
const root = path.resolve(__dirname, '../../../');

const indexStorage = require('./hdIndexModel');
const keyStorage = require('./keyStorage');


class Storage {

  constructor () {
    this.options = {
      dir: `${root}/storage`,
    };
  }

  async init () {
    return await storage.init(this.options);
  }

}

module.exports = {
  Storage: new Storage(),
  indexStorage,
  keyStorage
};