const wallet = require('../services/wallet/wallet');
const { readKeysFromFile } = require('../utils');


module.exports = function (req, res) {
  try {
    const params = req.body;
    const keys = readKeysFromFile();
    const addresses = wallet.generateAddress(keys, params.index);
    return res.json(addresses);
  } catch (e) {
    return res.error(e);
  }
};