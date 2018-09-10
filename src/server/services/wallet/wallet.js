const bcoin = require('bcoin');
const crypto = require('crypto');
const reverse = require('buffer-reverse');
const electrumApi = require('../../external/electrumx');
const { indexStorage, keyStorage } = require('../../models');
const { readKeysFromFile, ethToChecksumAddress } = require('../../utils');

const HDPrivateKey = bcoin.hd.PrivateKey;
const HDPublicKey = bcoin.hd.PublicKey;
const HDMnemonic = bcoin.hd.Mnemonic;
const Script = bcoin.Script;
const KeyRing = bcoin.KeyRing;
const { Output } = bcoin.primitives;

const EthereumBip44 = require('ethereum-bip44');
const ethUtil = require('ethereumjs-util');


const derivationPaths = {
  BTC: `m/44'/0'/0'/0`,
  ETH: `m/44'/60'/0'/0`
};

const ganacheMnemonic = 'alone animal sugar vendor nice marble enforce unit mandate police wave rubber';


class Wallet {
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

  generateKeyPair (coin, isGanache) {
    const mnemonic = this.generateMnemonic();
    if (isGanache) mnemonic.phrase = ganacheMnemonic;
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
      const isGanache = (coin === 'ETH' && i == 0);
      const keyPair = this.generateKeyPair(coin, isGanache);
      generatedKeys.push(keyPair);
    }

    return generatedKeys;
  }

  async generateAddressETH (index) {
    const keys = await keyStorage.getKeys('ETH');

    const addresses = keys.map(k => {
      const keyBuffer = HDPublicKey.fromBase58(k, this.nework).derive(0).publicKey;
      const address = ethUtil.publicToAddress(keyBuffer, true);
      const formattedAddress = `0x${address.toString('hex')}`;
      const checksumAddress = ethToChecksumAddress(formattedAddress);
      return {
        address: formattedAddress,
        checksumAddress
      }
    });


    //BIP44 derivation
    // index = 0;
    // const addresses = keys.map(k => {
    //   const key = EthereumBip44.fromPublicSeed(k);
    //   const derived = key.derive(index);
    //   const addressBuffer = ethUtil.publicToAddress(
    //     EthereumBip44.bip32PublicToEthereumPublic(derived.publicKey.toBuffer()),
    //   );
    //   return `0x${addressBuffer.toString('hex')}`;
    // });

    return addresses;
  }

  async generateAddressBTC (index) {
    const keys = readKeysFromFile();

    const derivedPubKeys = keys.map(key => {
      return HDPublicKey
        .fromBase58(key, this.nework)
        .derive(index)
        .publicKey;
    });

    const p2shMultisigScript = Script.fromMultisig(2, derivedPubKeys.length, derivedPubKeys);
    const p2shAddress = p2shMultisigScript.getAddress().toBase58(this.nework);

    const rings = derivedPubKeys.map(key => {
      const ring = KeyRing.fromPublic(key);
      ring.witness = true;
      return ring;
    });

    rings[0].script = p2shMultisigScript;
    const p2wshAddress = rings[0].getAddress().toString();
    const p2shP2wshAddress = rings[0].getNestedAddress().toString();

    return {
      p2shAddress,
      p2wshAddress,
      p2shP2wshAddress
    };
  }

  async newAddress (coin) {
    let lastIndex = await indexStorage.getIndex(coin);
    const index = lastIndex ? lastIndex + 1 : 0;

    const fnName = `generateAddress${coin}`;
    const address = await this[fnName](index);

    indexStorage.saveIndex(index, coin);

    return address;
  }

  async getAddressPool () {
    const lastIndex = await indexStorage.getIndex('BTC');
    return Promise.all(Array(lastIndex + 1).fill(null).map((_, i) => this.generateAddressBTC(i)));
  }

  getUtxo (address) {
    bcoin.set('main');
    const rawAddress = Output.fromScript(address, 10000);
    const script = rawAddress.script.toRaw();

    let scriptHash = crypto.createHash('sha256').update(script, 'utf8').digest();
    scriptHash = reverse(scriptHash).toString('hex');

    return electrumApi.getUtxo(scriptHash);
  }

  getTx (txHash) {
    return electrumApi.getTx(txHash);
  }

  async getInputs (address) {
    const utxos = await this.getUtxo(address);
    const inputs = [];

    for (const utxo of utxos) {
      const tx = await this.getTx(utxo.tx_hash);
      inputs.push({
        rawTx: tx,
        index: utxo.tx_pos,
        address: address,
        value: utxo.value,
        height: utxo.height
      });
    }

    return inputs;
  }

}


module.exports = new Wallet();


