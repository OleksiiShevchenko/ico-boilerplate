const TarusMultisigWallet = artifacts.require("WalletSimple");

module.exports = function(deployer) {
  deployer.deploy(TarusMultisigWallet, ["0x72D1b4A6Eb5BD9Da42F987E7E30aBb3e7EfFd72f", "0xBdda346609C71204090d87eAA61251Af451B631c", "0x42dA0050f700fBF4A25DfD646f1872F4BC3f4D34"]);
};