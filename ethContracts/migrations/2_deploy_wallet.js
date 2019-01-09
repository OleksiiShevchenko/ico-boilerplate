const TarusMultisigWallet = artifacts.require("WalletSimple");

module.exports = function(deployer) {
  deployer.deploy(TarusMultisigWallet, ["0x72D1b4A6Eb5BD9Da42F987E7E30aBb3e7EfFd72f", "0x001547B3269F5aE8a973a7349dC84973A8570244", "0x85aF001FB08e05f05B8591ECc612A0A9D7a4ed49"]);
};