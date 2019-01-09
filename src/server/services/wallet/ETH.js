const Wallet = require('./wallet');
const bcoin = require('bcoin');
const {indexStorage, keyStorage} = require('../../models');
const clc = require("cli-color");

const HDPublicKey = bcoin.hd.PublicKey;

const ethUtil = require('ethereumjs-util');
const BN = ethUtil.BN;
const BigNumber = require('bignumber.js');
const {ethToChecksumAddress} = require('../../utils');

const truffleContract = require('truffle-contract');
const path = require('path');
const Web3 = require('web3');

const root = path.join(__dirname, '../../../../');
const wSimple = path.resolve(`${root}/ethContracts/build/contracts/WalletSimple.json`);
const forwarder = path.resolve(`${root}/ethContracts/build/contracts/Forwarder.json`);


class ETH extends Wallet {

  constructor(args) {
    super(args);
    this.derivationPath = `m/44'/60'/0'/0`;
    this.coin = `ETH`;
    this.network = 'main';

    this.wSimpleJson = require(wSimple);
    this.forwarderJson = require(forwarder);

    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    //load WalletSimple.sol contract from json
    this.wallet = truffleContract(this.wSimpleJson);
    this.wallet.setProvider(this.web3.currentProvider);

    //load forwarder.sol contract from json
    this.fder = truffleContract(this.forwarderJson);
    this.fder.setProvider(this.web3.currentProvider);
  }

  async generateAddress() {
    try {
      const walletInstance = await this.wallet.deployed();
      const nonce = await this.getNonce();
      const forwarderAddress = this.getNextContractAddress(walletInstance.address, nonce);


      //deploy a new forwarder contract
      const forwarder = await walletInstance.createForwarder({from: this.web3.eth.accounts[0], gas: 500000});
      //console.log(await walletInstance.createForwarder.call());

      //attach an instance of a new forwarder to an address
      //const fderInstance = fder.at(forwarderAddress);

      //console.log(clc.xterm(116).bold(`Generated new forwarder address: ${forwarderAddress}`));
      return { forwarderAddress };
    } catch (e) {
      throw new Error(e)
    }
  }

  async contractAddress () {
    const walletInstance = await this.wallet.deployed();
    return walletInstance.address;
  }

  getNextContractAddress (address, nonce) {
    //Generates an address of a newly created contract based on main contract address and nonce
    return ethUtil.bufferToHex(ethUtil.generateAddress(address, nonce));
  }

  async getNonce () {
    const address = await this.contractAddress();
    return this.web3.eth.getTransactionCount(address);
  }

  async getSequenceId () {
    const walletInstance = await this.wallet.deployed();
    return walletInstance.getNextSequenceId.call();
  }

  async getMasterAddresses() {
    const keys = await keyStorage.getKeys('ETH');
    const DERIVATION_INDEX = 0;

    const addresses = keys.map(k => {
      const keyBuffer = HDPublicKey.fromBase58(k, this.nework).derive(DERIVATION_INDEX).publicKey;
      const address = ethUtil.publicToAddress(keyBuffer, true);
      const formattedAddress = `0x${address.toString('hex')}`;
      const checksumAddress = ethToChecksumAddress(formattedAddress);
      return {
        checksumAddress,
        index: DERIVATION_INDEX
      }
    });

    return addresses;
  }

  async broadcast(rawTx) {
    const hash = await this.web3.eth.sendRawTransaction(rawTx);
    return hash;
  }

  getMasterAddressNonce (addresses) {
    return addresses.map(item => {
      const nonce = this.web3.eth.getTransactionCount(item.checksumAddress);
      item.nonce = nonce;
      return item;
    });
  }

  async getAddressPool () {
    const lastIndex = await this.getNonce();
    const address = await this.contractAddress();
    return Promise.all(Array(lastIndex + 1).fill(null).map((_, i) => this.getNextContractAddress(address, i)));
  }

  async getBalance () {
    const address = await this.contractAddress();
    const balance = this.web3.eth.getBalance(address).toString();
    console.log(clc.yellow.bold(`Balance on wallet ${balance}`));
    return balance;
  }

  estimateGas (to, amount) {

    const gas = this.web3.eth.estimateGas({
      from: this.web3.eth.accounts[0],
      to: to,
      amount: amount,
      data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    });

    const gasLimit = gas * 2;
    const gasPrice = this.web3.eth.gasPrice;

    return {
      gas: gas.toString(),
      gasPrice: gasPrice.toString(),
      gasLimit
    };
  }

  async sendTransaction (fromAddress, toAddress, amount) {
    try {
      if (!fromAddress) fromAddress = this.web3.eth.accounts[0];

      const balance = this.web3.eth.getBalance(fromAddress).toString();
      console.log(clc.yellow.bold(`From account balance: ${balance}`));

      const nonce = this.web3.eth.getTransactionCount(fromAddress, "latest");
      console.log(clc.cyan.bold(`Nonce: ${nonce}`));

      const gas = this.web3.eth.estimateGas({
        from: fromAddress,
        to: toAddress,
        amount: amount || balance
      });
      console.log(clc.red.bold(`Estimated gas: ${gas}`));

      const gasLimit = gas * 2;
      console.log(clc.blue.bold(`Gas limit: ${gasLimit}`));

      const gasPrice = this.web3.eth.gasPrice;
      console.log(clc.green.bold(`Gas price: ${gasPrice}`));

      const txAmount = amount || (balance - gasLimit*gasPrice);
      console.log(clc.green.bold(`Amount: ${txAmount}`));

      const transaction = {
        from: fromAddress,
        to: toAddress,
        value: this.coinsToWei(txAmount).toString(),
        gas: new BN(gasLimit.toString(16), 16),
        gasPrice: new BN(gasPrice.toString(16), 16),
      };

      const txHash = this.web3.eth.sendTransaction(transaction);
      console.log(clc.xterm(116).bold(`TxHash: ${txHash}`));

      return txHash;
    } catch (e) {
      throw new Error(e);
    }
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

  coinsToWei(coins) {
    const WEI_MULT = 10 ** 18;
    return new BigNumber(coins).multipliedBy(WEI_MULT);
  }


}


module.exports = new ETH();