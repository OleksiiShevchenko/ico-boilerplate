const bcoin = require('bcoin');
const crypto = require('crypto');
const { indexStorage } = require('../../models');

const HDPrivateKey = bcoin.hd.PrivateKey;
const HDMnemonic = bcoin.hd.Mnemonic;




class Wallet {
  constructor () {
    this.mOptions = {
      language: 'english',
      bits: 256
    };
  }

  generateMnemonic () {
    const mnemonic = HDMnemonic.fromOptions(this.mOptions);
    return mnemonic.toJSON();
  }

  generatePrivateKey (phrase, dPath) {
    const key = HDPrivateKey.fromPhrase(phrase, this.network);
    return key.derivePath(dPath);
  }

  generatePubKey (privateKey) {
    return privateKey.toPublic();
  }

  generateKey (coin) {
    const keyPair = this.generateKeyPair(coin);
    return keyPair;
  }

  async addNewAddress () {
    let lastIndex = await indexStorage.getIndex(this.coin);
    const index = (lastIndex !== null) ? lastIndex + 1 : 0;
    const address = await this.generateAddress(index);
    indexStorage.saveIndex(index, this.coin);
    return address;
  }
}


module.exports = Wallet;


