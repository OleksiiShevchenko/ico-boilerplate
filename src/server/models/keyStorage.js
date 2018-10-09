const storage = require('node-persist');

class keyModel {

  constructor () {
    this.keyNames = {
      BTC: 'pubKeysBTC',
      ETH: 'pubKeysETH'
    };
  }

  async saveKeys (data, coin) {
    let currentKeys = await storage.getItem(this.keyNames[coin]);
    if (!currentKeys) currentKeys = [];

    if (currentKeys.indexOf(data) >= 0) throw new Error('Key already exists');

    currentKeys.push(data);
    return storage.setItem(this.keyNames[coin], currentKeys);
  }

  getKeys (coin) {
    return storage.getItem(this.keyNames[coin]);
  }

  updateKeys (keys, coin) {
    return storage.setItem(this.keyNames[coin], keys);
  }

}


module.exports = new keyModel();