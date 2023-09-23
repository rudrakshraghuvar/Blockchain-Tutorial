/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
// module.exports = {
//   solidity: "0.8.9",
// };
// require("@nomicfoundation/hardhat-toolbox");
const INFURA_API_KEY = "df186f15ed934e3da29ba3ced32a3396";
const SEPOLIA_PRIVATE_KEY = "8d7c0b246b24963f78e2c4258ffdb42f2e4ec201cb29f95cc2049955729a4b7b";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "BYEHTVF446BX5PV9VJIE2UATH3FF46DU6N"
  }
};