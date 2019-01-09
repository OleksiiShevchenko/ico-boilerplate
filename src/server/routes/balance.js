const wallet = require('../services/wallet');


module.exports = async function (req, res) {
  const { coin } = req.params;

  try {
    if (coin === 'ETH') {
      const balance = await wallet[coin].getBalance();
      return res.json(balance);
    }

    const addresses = await wallet[coin].getAddressPool();
    const flatArray = addresses.reduce((arr, data) => {
      Object.keys(data.addresses).forEach(type => {
        arr.push(data.addresses[type]);
      });
      return arr;
    }, []);

    let totalBalance = 0;

    await Promise.all(flatArray.map(async function(address) {
        let balance = 0;
        const utxos = await wallet[coin].getUtxo(address);
        if (utxos.length > 0) balance = utxos.reduce((total, utxo) => total + utxo.value, 0);
        totalBalance += balance;
        return balance;
    }));

    return res.json(totalBalance);
  } catch (e) {
    console.error(e);
    return res.end();
  }
};