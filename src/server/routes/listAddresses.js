const wallet = require('../services/wallet/wallet');

module.exports = async function (req, res) {
  try {
    const addresses = await wallet.getAddressPool();
    return res.json(addresses);
  } catch (e) {
    console.error(e);
    return res.end();
  }

};