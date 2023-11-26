import { ethers } from "hardhat";

async function main() {
  const ftt= await ethers.deployContract("FamilyTreeToken");
  await ftt.waitForDeployment();
  console.info(ftt.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
