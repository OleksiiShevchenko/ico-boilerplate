const express = require('express');
const router = express.Router();

const keygen = require('./routes/generateKeys');
const getAddress = require('./routes/address');
const handleUtxo = require('./routes/utxo');
const handleBalance = require('./routes/balance');
const handleTxGeneration = require('./routes/handleTxGeneration');

router.get('/keygen/:coin', keygen);
router.get('/getAddress/:coin', getAddress);
router.get('/utxo/:address', handleUtxo);
router.get('/balance/:address', handleBalance);
router.get('/generateTx', handleTxGeneration);


module.exports = router;

