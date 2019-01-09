const wallet = require('../services/wallet');
const { keyStorage } = require('../models');

module.exports = async function (req, res) {
  try {
    const { coin } = req.params;
    const { address, amount } = req.body.fields;
    const txData = {};

    if (coin === 'ETH') {

      txData.nonce = await wallet[coin].getNonce();
      txData.contractAddress = await wallet[coin].contractAddress();
      txData.amount = amount.value;
      txData.address = address.value;
      txData.currency = 'ETH';

      const masterAddresses = await wallet[coin].getMasterAddresses();
      txData.masterAddresses = wallet[coin].getMasterAddressNonce(masterAddresses);

      const sequenceId = await wallet[coin].getSequenceId();
      txData.sequenceId = sequenceId.toString();

      txData.fees = wallet[coin].estimateGas(txData.contractAddress, 0);
      txData.contract = wallet[coin].wSimpleJson;

      return res.json(txData);
    }

    const addresses = await wallet[coin].getAddressPool();
    const indexMap = {};
    addresses.forEach(item => {
      const addr = item.addresses;
      indexMap[addr.p2wshAddress] = item.derivationIndex;
      indexMap[addr.p2shAddress] = item.derivationIndex;
      indexMap[addr.p2shP2wshAddress] = item.derivationIndex;
    });

    const flatArray = addresses.reduce((arr, data) => {
      Object.keys(data.addresses).forEach(type => {
        arr.push(data.addresses[type]);
      });
      return arr;
    }, []);

    let inputs = await Promise.all(flatArray.map(address => wallet[coin].getInputs(address)));
    inputs = inputs.reduce((array, item) => array.concat(item), []);
    inputs = inputs.map(input => {
      input.derivationIndex = indexMap[input.address];
      return input;
    });

    txData.inputs = inputs;
    txData.amount = amount.value;
    txData.address = address.value;
    txData.masterPubKeys = await keyStorage.getKeys(coin);
    txData.currency = 'BTC';
    return res.json(txData);
  } catch (e) {
    console.error(e);
    return res.end();
  }

};