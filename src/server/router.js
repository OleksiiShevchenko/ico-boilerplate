const express = require('express');
const router = express.Router();

const listKeys = require('./routes/listKeys');
const keygen = require('./routes/generateKeys');
const getAddress = require('./routes/address');
const handleBalance = require('./routes/balance');
const handleTxGeneration = require('./routes/handleTxGeneration');
const importKeys = require('./routes/importKeys');
const getIndex = require('./routes/getIndex');
const listAddresses = require('./routes/listAddresses');
const deleteKey = require('./routes/deleteKey');
const getMasterAddresses = require('./routes/getMasterAddresses');
const handleETHTransfer = require('./routes/handleETHTransfer');





router.get('/keys/:coin', listKeys);
router.get('/keygen/:coin', keygen);
router.delete('/deleteKey', deleteKey);
router.post('/import', importKeys);

router.get('/getAddress', getAddress);
router.get('/ethMasterAddresses', getMasterAddresses);
router.get('/getIndex/:coin', getIndex);
router.get('/listAddresses/:coin', listAddresses);

router.get('/balance/:coin', handleBalance);
router.post('/generateTx/:coin', handleTxGeneration);
router.post('/transferETH', handleETHTransfer);


module.exports = router;

