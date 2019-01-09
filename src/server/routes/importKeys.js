
const { keyStorage } = require('../models');

module.exports = async function (req, res, next) {
  try {
    const { data: { key, coin } } = req.body;
    //TODO add validation for pub key
    if (!key || key == '') throw new Error('Invalid key format');

    const keys = await keyStorage.getKeys(coin);
    if (keys.length === 3) throw new Error('Max 3 keys allowed');

    await keyStorage.saveKeys(key, coin);
    return res.end();
  } catch (e) {
    next(e);
  }
};