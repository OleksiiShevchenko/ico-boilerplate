
const { keyStorage } = require('../models');

module.exports = async function (req, res, next) {
  try {
    const { data: { key, coin } } = req.body;

    if (!key || key == '') throw new Error('Invalid key format');

    await keyStorage.saveKeys(key, coin);
    return res.end();
  } catch (e) {
    next(e);
  }
};