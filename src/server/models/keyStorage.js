const storage = require('node-persist');

class keyModel {

  constructor () {
    this.keyNames = {
      BTC: 'pubKeysBTC',
      ETH: 'pubKeysETH'
    };
  }

  saveKeys (data, coin) {
    return storage.setItem(this.keyNames[coin], data);
  }

  getKeys (coin) {
    return storage.getItem(this.keyNames[coin]);
  }

}



module.exports = new keyModel();