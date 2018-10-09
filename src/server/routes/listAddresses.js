const wallet = require('../services/wallet');

module.exports = async function (req, res) {
  try {
    const { coin } = req.params;
    const addresses = await wallet[coin].getAddressPool();
    return res.json(addresses);
  } catch (e) {
    console.error(e);
    return res.end();
  }

};