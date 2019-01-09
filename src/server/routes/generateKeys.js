const wallet = require('../services/wallet');

const clc = require("cli-color");
const { keyStorage } = require('../models');

const coins = ['BTC', 'ETH'];



module.exports = async function (req, res, next) {
  const { coin } = req.params;

  if ( coins.indexOf(coin) < 0 ) throw new Error('Invalid coin');

  try {
    const keys = await keyStorage.getKeys(coin);
    if (keys.length == 3) throw new Error('Max 3 keys allowed');

    const key = wallet[coin].generateKey(coin);

    console.log(clc.yellow.bold.underline('Write down mnemonic phrases, they cannot be restored if lost.'));
    console.log(clc.cyan(key.mnemonic.phrase));

    keyStorage.saveKeys(key.pubKey, coin);

    return res.json(key);
  } catch (e) {
    next(e);
  }

};