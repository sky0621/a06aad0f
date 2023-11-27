import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FamilyTreeToken", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ftt = await ethers.deployContract("FamilyTreeToken", [
      owner.address,
      owner.address,
    ]);
    await ftt.waitForDeployment();

    return { ftt, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Correct name is set.", async function () {
      const { ftt } = await loadFixture(deployFixture);
      expect(await ftt.name()).to.equal("FamilyTreeToken");
    });

    it("Correct symbol is set.", async function () {
      const { ftt } = await loadFixture(deployFixture);
      expect(await ftt.symbol()).to.equal("FTT");
    });

    it("MINTER role can mint.", async function () {
      const { ftt, owner, otherAccount } = await loadFixture(deployFixture);
      await ftt.connect(owner).safeMint(otherAccount);
      expect(await ftt.balanceOf(owner.address)).to.equal(0);
      expect(await ftt.balanceOf(otherAccount.address)).to.equal(1);
    });

    it("Cannot mint except for the MINTER role.", async function () {
      const { ftt, owner, otherAccount } = await loadFixture(deployFixture);
      expect(ftt.connect(otherAccount).safeMint(otherAccount)).to.be.throw;
    });
  });
});
