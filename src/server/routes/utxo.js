const wallet = require('../services/wallet/wallet');


module.exports = async function utxo (req, res) {
  const { address } = req.params;

  try {
    const utxos = await wallet.getUtxo(address);
    return res.json(utxos);

  } catch (e) {
    throw new Error(e);
  }

};