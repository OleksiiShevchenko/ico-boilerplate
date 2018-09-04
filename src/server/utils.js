const fs = require('fs');
const path = require('path');


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



module.exports = {
  createTxFile,
  writeKeysToFile,
  readKeysFromFile
};