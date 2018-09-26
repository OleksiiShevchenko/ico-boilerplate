const { indexStorage } = require('../models');

module.exports = async function (req, res) {
  const { coin } = req.params;

  try {
    const index = await indexStorage.getIndex(coin);
    return res.json(index);
  } catch (e) {
    return res.end(e);
  }
};