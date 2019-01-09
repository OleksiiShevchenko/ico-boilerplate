const Wallet = require('./wallet');
const bcoin = require('bcoin');
const crypto = require('crypto');
const reverse = require('buffer-reverse');
const { indexStorage, keyStorage } = require('../../models');
const electrumApi = require('../../external/electrumx');

const HDPublicKey = bcoin.hd.PublicKey;
const Script = bcoin.Script;
const KeyRing = bcoin.KeyRing;
const { Output } = bcoin.primitives;


class BTC extends Wallet {

  constructor (args) {
    super(args);
    this.derivationPath = `m/44'/0'/0'/0`;
    this.coin = `BTC`;
    this.network = 'main';
  }

  async generateAddress (index) {
    const keys = await keyStorage.getKeys(this.coin);

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
      derivationIndex: index,
      addresses: {
        p2shAddress,
        p2wshAddress,
        p2shP2wshAddress
      }
    };
  }

  async getAddressPool () {
    let lastIndex = await indexStorage.getIndex(this.coin);
    if (!lastIndex) lastIndex = 0;
    return Promise.all(Array(lastIndex + 1).fill(null).map((_, i) => this.generateAddress(i)));
  }

  getUtxo (address) {
    bcoin.set(this.network);
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

  generateKeyPair () {
    const mnemonic = this.generateMnemonic();
    const privateKey = this.generatePrivateKey(mnemonic.phrase, this.derivationPath);
    const pubKey = this.generatePubKey(privateKey);

    return {
      mnemonic,
      privateKey: privateKey.toBase58(),
      pubKey: pubKey.toBase58()
    };
  }

}


module.exports = new BTC();