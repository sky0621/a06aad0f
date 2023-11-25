import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv"

dotenv.config()

const INFURA_API_KEY = process.env.INFURA_API_KEY ?? ""
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY ?? ""

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY ?? ""
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [OWNER_PRIVATE_KEY]
    }
  },
};

export default config;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
