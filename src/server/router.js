const express = require('express');
const router = express.Router();

const keygen = require('./routes/generateKeys');
const getAddress = require('./routes/address');
const handleUtxo = require('./routes/utxo');
const handleBalance = require('./routes/balance');

router.get('/keygen', keygen);
router.post('/getAddress', getAddress);
router.get('/utxo/:address', handleUtxo);
router.get('/balance', handleBalance);


module.exports = router;

