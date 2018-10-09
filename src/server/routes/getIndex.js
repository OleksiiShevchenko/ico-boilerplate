const { indexStorage } = require('../models');
const wallet = require('../services/wallet');

module.exports = async function (req, res) {
  try {
    const { coin } = req.params;
    let index = 0;

    switch (coin) {
      case 'BTC':
        index = await indexStorage.getIndex(coin);
        break;
      case 'ETH':
        index = await wallet[coin].getNonce();
        break;
      default:
        index = 0;
    }

    return res.json(index);
  } catch (e) {
    return res.end(e);
  }
};