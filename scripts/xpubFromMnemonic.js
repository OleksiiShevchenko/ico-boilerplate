const bcoin = require('bcoin');
const PrivateKey = bcoin.hd.PrivateKey;
const mnemonic = "debate error because game noise neglect off crater warfare lizard man play coral trade detect energy dream lottery royal cousin parrot north oppose permit";
const network = "main";

function getXPUBFromMnemonic (path) {
  const pr = PrivateKey.fromPhrase(mnemonic, network);
  const xpub = pr.derivePath(path).toPublic().toBase58();
  return xpub;
}


console.log(getXPUBFromMnemonic("m/44'/0'/0'/0"));
