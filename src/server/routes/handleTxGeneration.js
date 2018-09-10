const wallet = require('../services/wallet/wallet');
const clc = require("cli-color");
const { createTxFile } = require('../utils');


module.exports = async function (req, res) {
  try {
    const addresses = await wallet.getAddressPool();
    const flatArray = addresses.reduce((arr, set) => {
      Object.keys(set).forEach(type => {
        arr.push(set[type]);
      });
      return arr;
    }, []);

    let inputs = await Promise.all(flatArray.map(address => wallet.getInputs(address)));
    inputs = inputs.reduce((array, item) => array.concat(item), []);

    createTxFile(JSON.stringify(inputs, null, 2));

    return res.json(inputs);
  } catch (e) {
    console.error(e);
    return res.end();
  }

};