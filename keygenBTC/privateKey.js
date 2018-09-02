const bcoin = require('bcoin');

const HDPrivateKey = bcoin.hd.PrivateKey;
const HDPublicKey = bcoin.hd.PublicKey;
const HDMnemonic = bcoin.hd.Mnemonic;
const Script = bcoin.Script;
const KeyRing = bcoin.KeyRing;


const derivationPaths = {
  BTC: `m/44'/0'/0'/0`,
  ETH: `m/44'/60'/0'/0`
};


class Keys {
  constructor () {
    this.mOptions = {
      language: 'english',
      bits: 256
    };

    this.nework = 'main';
  }

  generateMnemonic () {
    const mnemonic = HDMnemonic.fromOptions(this.mOptions);
    return mnemonic.toJSON();
  }

  generatePrivateKey (phrase, dPath) {
    const key = HDPrivateKey.fromPhrase(phrase, this.network);
    return key.derivePath(dPath);
  }

  generatePubKey (privateKey) {
    return privateKey.toPublic();
  }

  generateKeyPair (coin) {
    const mnemonic = this.generateMnemonic();
    const privateKey = this.generatePrivateKey(mnemonic.phrase, derivationPaths[coin]);
    const pubKey = this.generatePubKey(privateKey);

    return {
      mnemonic,
      privateKey: privateKey.toBase58(),
      pubKey: pubKey.toBase58()
    };
  }

  generateKeys (number, coin) {
    const generatedKeys = [];

    for ( let i = 0; i < number; i++ ) {
      const keyPair = this.generateKeyPair(coin);
      generatedKeys.push(keyPair);
    }

    return generatedKeys;
  }

  generateAddress (keys, index) {

    const derivedPubKeys = keys.map(keyPair => {
      return HDPublicKey
        .fromBase58(keyPair.pubKey, this.nework)
        .derive(index)
        .toPublic().publicKey;
    });

    const p2shMultisigScript = Script.fromMultisig(2, derivedPubKeys.length, derivedPubKeys);
    const p2shAddress = p2shMultisigScript.getAddress().toBase58(this.nework);

    const rings = derivedPubKeys.map(key => {
      const ring = KeyRing.fromPublic(key);
      ring.witness = true;
      return ring;
    });

    const ringPubKeys = rings.map(r => r.publicKey);
    const p2wshMultisigScript = Script.fromMultisig(2, ringPubKeys.length, ringPubKeys);
    rings[0].script = p2wshMultisigScript;
    const p2wshAddress = rings[0].getAddress().toString();

    return {
      p2shAddress,
      p2wshAddress
    };
  }

}


const keys = new Keys();




const keygenResult = keys.generateKeys(3, 'BTC');

const addresses = Array(10).fill().map((item, i) => {
  return keys.generateAddress(keygenResult, i);
});

console.log(keygenResult, addresses);
