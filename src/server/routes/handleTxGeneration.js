const wallet = require('../services/wallet/wallet');
const clc = require("cli-color");
const { createTxFile } = require('../utils');


module.exports = async function (req, res) {
  const { addresses } = req.body;
  if (addresses.length == 0) throw new Error('ADDRESSES_NOT_SPECIFIED');

  try {
    let inputs = [];

    for (const address of addresses) {
      const inputsPerAddress = await wallet.getInputs(address);
      inputs = inputs.concat(inputsPerAddress);
    }

    createTxFile(JSON.stringify(inputs, null, 2));

    return res.json(inputs);
  } catch (e) {
    console.error(e);
    return res.end();
  }

};