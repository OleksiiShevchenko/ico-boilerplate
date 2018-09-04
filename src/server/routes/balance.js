const wallet = require('../services/wallet/wallet');


module.exports = async function (req, res) {
  const { address } = req.params;

  try {
    const utxos = await wallet.getUtxo(address);

    let balance = 0;
    if (utxos.length > 0) balance = utxos.reduce((total, utxo) => total + utxo.value, 0);
    return res.json({balance});

  } catch (e) {
    console.error(e);
    return res.end();
  }
};