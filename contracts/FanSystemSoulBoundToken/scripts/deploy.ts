import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const OWNER_ADDRESS = process.env.OWNER_ADDRESS ?? "";

async function main() {
  const ftt = await ethers.deployContract("FanSystemSoulBoundToken", [
    OWNER_ADDRESS,
  ]);
  await ftt.waitForDeployment();

  console.log(`deployed to ${ftt.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
