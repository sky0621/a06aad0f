import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv"

dotenv.config()

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY ?? ""
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY ?? ""
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY ?? ""

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [OWNER_PRIVATE_KEY]
    }
  },
};

export default config;
