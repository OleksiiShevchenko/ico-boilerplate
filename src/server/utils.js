const fs = require('fs');
const path = require('path');
const createKeccakHash = require('keccak');


const createTxFile = function (data) {
  const root = path.resolve(__dirname, '../../');
  const dir = `${root}/transactions`;

  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/transaction.json`, data);
  } catch (e) {
    console.error(e);
    return e;
  }

};

const writeKeysToFile = function (keys) {
  const root = path.resolve(__dirname, '../../');
  const dir = `${root}/keys`;

  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/keys.json`, keys);
  } catch (e) {
    console.error(e);
    return e;
  }

};


const readKeysFromFile = function (keys) {
  const root = path.resolve(__dirname, '../../');
  const dir = `${root}/keys`;

  try {
    const keys = fs.readFileSync(`${dir}/keys.json`);
    return JSON.parse(keys.toString());
  } catch (e) {
    console.error(e);
    return e;
  }

};

const ethToChecksumAddress = function (address) {
  address = address.toLowerCase().replace('0x', '');
  const hash = createKeccakHash('keccak256').update(address).digest('hex');
  let result = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      result += address[i].toUpperCase();
    } else {
      result += address[i];
    }
  }

  return result
};


module.exports = {
  createTxFile,
  writeKeysToFile,
  readKeysFromFile,
  ethToChecksumAddress
};