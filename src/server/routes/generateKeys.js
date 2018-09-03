const wallet = require('../services/wallet/wallet');
const clc = require("cli-color");
const { writeKeysToFile } = require('../utils');

module.exports = function (req, res) {

  try {
    const keys = wallet.generateKeys(3, 'BTC');

    console.log(clc.yellow.bold.underline('Write down mnemonic phrases, they cannot be restored if lost.'));
    keys.forEach(key => console.log(clc.cyan(key.mnemonic.phrase)));

    const publicToSave = keys.map(keyPair => keyPair.pubKey);
    writeKeysToFile(JSON.stringify(publicToSave, null, 2));

    return res.json(keys);
  } catch (e) {
    return res.error(e);
  }

};