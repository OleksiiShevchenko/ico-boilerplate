const wallet = require('../services/wallet');


module.exports = async function (req, res) {
  try {
    const btcAddresses = await wallet['BTC'].addNewAddress();
    const ethAddresses = await wallet['ETH'].addNewAddress();

    return res.json({
      btcAddresses,
      ethAddresses
    });
  } catch (e) {
    console.error(e);
    return res.end(e);
  }
};