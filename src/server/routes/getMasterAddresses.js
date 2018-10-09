const ethWallet = require('../services/wallet/ETH');




module.exports = async function (req, res) {
  try {
    const masterAddresses = await ethWallet.getMasterAddresses();
    return res.json(masterAddresses);
  } catch (e) {
    return res.end(e);
  }

};