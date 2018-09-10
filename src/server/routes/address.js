const wallet = require('../services/wallet/wallet');


module.exports = async function (req, res) {
  const { coin } = req.params;

  try {
    const addresses = await wallet.newAddress(coin);
    return res.json(addresses);
  } catch (e) {
    console.error(e);
    return res.end(e);
  }
};