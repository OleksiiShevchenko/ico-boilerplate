const wallet = require('../services/wallet');
const { keyStorage } = require('../models');

module.exports = async function (req, res) {
  try {
    const { coin } = req.params;
    const { address, amount } = req.body.fields;
    const txData = {};

    if (coin === 'ETH') {
      txData.nonce = await wallet[coin].getNonce();
      txData.contract = wallet[coin].wSimpleJson;
      txData.amount = amount.value;
      txData.address = address.value;
      return res.json(txData);
    }



    const addresses = await wallet[coin].getAddressPool();
    const flatArray = addresses.reduce((arr, set) => {
      Object.keys(set).forEach(type => {
        arr.push(set[type]);
      });
      return arr;
    }, []);

    let inputs = await Promise.all(flatArray.map(address => wallet[coin].getInputs(address)));
    inputs = inputs.reduce((array, item) => array.concat(item), []);


    txData.inputs = inputs;
    txData.amount = amount.value;
    txData.address = address.value;
    txData.masterPubKeys = await keyStorage.getKeys(coin);

    return res.json(txData);
  } catch (e) {
    console.error(e);
    return res.end();
  }

};