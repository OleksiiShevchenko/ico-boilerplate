const storage = require('node-persist');

class hdIndexModel {

  constructor () {
    this.indexKeys = {
      BTC: 'derivationIndexBTC',
      ETH: 'derivationIndexETH'
    };
  }

  saveIndex (index, coin) {
    return storage.setItem(this.indexKeys[coin], index);
  }

  getIndex (coin) {
    return storage.getItem(this.indexKeys[coin]);
  }

}



module.exports = new hdIndexModel();