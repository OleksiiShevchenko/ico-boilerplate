const express = require('express');
const router = express.Router();

const listKeys = require('./routes/listKeys');
const keygen = require('./routes/generateKeys');
const getAddress = require('./routes/address');
const handleUtxo = require('./routes/utxo');
const handleBalance = require('./routes/balance');
const handleTxGeneration = require('./routes/handleTxGeneration');
const importKeys = require('./routes/importKeys');
const getIndex = require('./routes/getIndex');
const listAddresses = require('./routes/listAddresses');


router.get('/keys/:coin', listKeys);
router.get('/keygen/:coin', keygen);
router.post('/import', importKeys);

router.get('/getAddress/:coin', getAddress);
router.get('/getIndex/:coin', getIndex);
router.get('/listAddresses/:coin', listAddresses);

router.get('/utxo/:address', handleUtxo);
router.get('/balance/:address', handleBalance);
router.get('/generateTx', handleTxGeneration);


module.exports = router;

