const wallet = require('../services/wallet');


module.exports = async function (req, res) {
  try {
    const { rawTx, coin } = req.body;

    if (coin === 'ETH') {
      const txhash = await wallet[coin].broadcast(rawTx);
      res.json({txhash});
    }

  } catch (e) {
    console.error(e);
    return res.end();
  }

};