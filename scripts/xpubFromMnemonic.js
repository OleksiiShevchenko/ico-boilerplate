const bcoin = require('bcoin');
const PrivateKey = bcoin.hd.PrivateKey;
const mnemonic = "skin used toilet expire vendor language crush guess jar uphold spray bag silk vacant salmon nerve endorse series tube lunar butter ski hurry fine";
//const mnemonic = "wing omit room mystery like artefact cross avoid nice layer collect shove stock assault tired hood kid year unit bicycle airport hood right stand";
const network = "main";

function getXPUBFromMnemonic (path) {
  const pr = PrivateKey.fromPhrase(mnemonic, network);
  const xpub = pr.derivePath(path).toPublic().toBase58();
  return xpub;
}


console.log(getXPUBFromMnemonic("m/44'/0'/0'/0"));