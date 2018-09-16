const TarusMultisigWallet = artifacts.require("WalletSimple");

module.exports = function(deployer) {
  deployer.deploy(TarusMultisigWallet, ["0x710E1B826b438D8f1a85B467b2a895B5a1274220", "0xE84078287e6C4684a08E7aa0697f3FFD039cB1eB", "0x0BDd2af21d876962D637FFc99019E2fe2c6eA8f2"]);
};