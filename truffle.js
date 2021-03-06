//var HDWalletProvider = require("truffle-hdwallet-provider");
//var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
  networks: {
    development: {
      //provider: function() {
        //return new HDWalletProvider(mnemonic, "http:/localhost:8545/", 0, 50);
        host: "blockchain",
        port: 8545,
        network_id: "*" // Match any network id      
      },
      network_id: '*',
      gas: 80000000,
      gasPrice: 20000000000
    },
  compilers: {
    solc: {
      version: "^0.4.24"
    }
  }
}