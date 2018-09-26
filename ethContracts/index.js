const truffleContract = require('truffle-contract');
const path = require('path');
const Web3 = require('web3');
const clc = require("cli-color");
const ethUtil = require('ethereumjs-util');


const wSimple = path.resolve('./build/contracts/WalletSimple.json');
const forwarder = path.resolve('./build/contracts/Forwarder.json');
const wSimpleJson = require(wSimple);
const forwarderJson = require(forwarder);
const BN = ethUtil.BN;


const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

//load WalletSimple.sol contract from json
const wallet = truffleContract(wSimpleJson);
wallet.setProvider(web3.currentProvider);

//load forwarder.sol contract from json
const fder = truffleContract(forwarderJson);
fder.setProvider(web3.currentProvider);




//Generate a new address from wallet simple contract to attach forwarder to
async function getForwarderAddress () {
  try {
    const walletInstance = await wallet.deployed();
    const forwarderAddress = getNextContractAddress(walletInstance.address);
    console.log(forwarderAddress);

    //deploy a new forwarder contract
    const forwarder = await walletInstance.createForwarder({from: web3.eth.accounts[0], gas: 500000});
    console.log(await walletInstance.createForwarder.call());

    //attach an instance of a new forwarder to an address
    const fderInstance = fder.at(forwarderAddress);

    console.log(clc.xterm(116).bold(`Generated new forwarder address: ${forwarderAddress}`));
    return forwarderAddress;
  } catch (e) {
    throw new Error(e)
  }
}

function getNextContractAddress (address) {
  const nonce = web3.eth.getTransactionCount(address);
  //Generates an address of a newly created contract based on main contract address and nonce
  return ethUtil.bufferToHex(ethUtil.generateAddress(address, nonce));
}

//Example forwarder 0xdfedaa3f50d8455ec22184cd5f5f6d82312e063a
//Example forwarder 0xf2c693b78d50e26d0f10f8f9722a149bf94d079d
async function getBalance (address) {
  const balance = web3.eth.getBalance(address).toString();
  console.log(clc.yellow.bold(`Balance on wallet ${balance}`));
  return balance;
}



async function sendTransaction (fromAddress, toAddress, amount) {
  try {
    const balance = getBalance(fromAddress);
    console.log(clc.yellow.bold(`From account balance: ${balance}`));


    const nonce = web3.eth.getTransactionCount(fromAddress, "latest");
    console.log(clc.cyan.bold(`Nonce: ${nonce}`));


    const gas = web3.eth.estimateGas({
      from: fromAddress,
      to: toAddress,
      amount: amount || balance
    });
    console.log(clc.red.bold(`Estimated gas: ${gas}`));


    const gasLimit = gas * 2;
    console.log(clc.blue.bold(`Gas limit: ${gasLimit}`));


    const gasPrice = web3.eth.gasPrice;
    console.log(clc.green.bold(`Gas price: ${gasPrice}`));


    const txAmount = amount || (balance - gasLimit*gasPrice);
    console.log(clc.green.bold(`Amount: ${txAmount}`));


    const transaction = {
      from: fromAddress,
      to: toAddress,
      value: new BN(txAmount.toString(16), 16),
      gas: new BN(gasLimit.toString(16), 16),
      gasPrice: new BN(gasPrice.toString(16), 16),
    };

    const txHash = web3.eth.sendTransaction(transaction);
    console.log(clc.xterm(116).bold(`TxHash: ${txHash}`));
    return txHash;
  } catch (e) {
    throw new Error(e);
  }
}




//sendTransaction(web3.eth.accounts[0], '0xdfedaa3f50d8455ec22184cd5f5f6d82312e063a', 15000000000000000000);

//getBalance('0x067e78213ef70711a2f41e0981b5d22170423251');

getForwarderAddress();