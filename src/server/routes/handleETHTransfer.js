const wallet = require('../services/wallet');


module.exports = async function (req, res) {
  try {
    const { transferAddress, transferAmount } = req.body;
    console.log(transferAddress, transferAmount);
    const txhash = await wallet['ETH'].sendTransaction(null, transferAddress.value, parseInt(transferAmount.value));
    res.json({txhash});
  } catch (e) {
    console.error(e);
    return res.end();
  }

};