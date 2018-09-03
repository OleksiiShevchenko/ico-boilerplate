const fs = require('fs');
const path = require('path');


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
  writeKeysToFile,
  readKeysFromFile
};