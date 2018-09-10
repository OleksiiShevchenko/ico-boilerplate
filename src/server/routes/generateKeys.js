const wallet = require('../services/wallet/wallet');
const clc = require("cli-color");
const { writeKeysToFile } = require('../utils');
const { keyStorage } = require('../models');

const coins = ['BTC', 'ETH'];

module.exports = async function (req, res) {
  const { coin } = req.params;

  if ( coins.indexOf(coin) < 0 ) throw new Error('Invalid coin');

  try {
    const keys = wallet.generateKeys(3, coin);

    console.log(clc.yellow.bold.underline('Write down mnemonic phrases, they cannot be restored if lost.'));
    keys.forEach(key => console.log(clc.cyan(key.mnemonic.phrase)));

    const publicToSave = keys.map(keyPair => keyPair.pubKey);
    keyStorage.saveKeys(publicToSave, coin);

    return res.json(keys);
  } catch (e) {
    return res.end(e);
  }

};