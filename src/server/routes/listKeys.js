const { keyStorage } = require('../models');

module.exports = async function (req, res) {
  const { coin } = req.params;

  try {
    const keys = await keyStorage.getKeys(coin);
    return res.json(keys);
  } catch (e) {
    return res.end(e);
  }
};