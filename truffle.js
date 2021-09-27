var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
  networks: {
    development: {
      //provider: function() {
        //return new HDWalletProvider(mnemonic, "http:/localhost:8545/", 0, 50);
        host: "localhost",
        port: 8545,
        network_id: "*" // Match any network id      
      },
      network_id: '*',
      gas: 9999999
    },
  compilers: {
    solc: {
      version: "^0.4.24"
    }
};