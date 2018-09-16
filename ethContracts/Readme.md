## Using [BitGo Multisig wallet v2](https://github.com/BitGo/eth-multisig-v2) smart contract.

#### 1. Deploy smart contract to Ganache VM using truffle.
* Delete `build` directory if it exists
* Make sure connection to Ganache is correctly configured in `truffle.js`
* Run command `truffle migrate`

#### 2. Create forwarder address
* Get current multisig wallet balance using `getBalance` method by passing the main contract address as the only parameter
* Execute `getForwarderAddress` function - it will create a new Forwarder contract, new address and attach contract to a new address.
* Execute function `sendTransaction` that will generate and broadcast a fund transfer to network. Pass from address, to address and optional amount. If amount is not defined, it will transfer all balance to the to address. Send funds to forwarder contract address.
* Execute `getBalance` again for the main contract address and see how funds were forwarded to it. The forwarder address balance will be 0.
