import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FanSystemSoulBoundToken", function () {
  async function deployFixture() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    const sbt = await ethers.deployContract("FanSystemSoulBoundToken", [
      owner.address,
    ]);
    await sbt.waitForDeployment();

    return { sbt, owner, otherAccount, otherAccount2 };
  }

  describe("Deployment", function () {
    it("Correct name is set.", async function () {
      const { sbt } = await loadFixture(deployFixture);
      expect(await sbt.name()).to.equal("FanSystemSoulBoundToken");
    });

    it("Correct symbol is set.", async function () {
      const { sbt } = await loadFixture(deployFixture);
      expect(await sbt.symbol()).to.equal("FSSBT");
    });
  });

  // safeMint(address to)
  describe("Mint", function () {
    it("Owner can mint.", async function () {
      const { sbt, owner, otherAccount } = await loadFixture(deployFixture);
      await sbt.safeMint(otherAccount);
      expect(await sbt.balanceOf(otherAccount)).to.equal(1);
    });

    it("Not owner can not mint.", async function () {
      const { sbt, owner, otherAccount, otherAccount2 } =
        await loadFixture(deployFixture);
      expect(
        await sbt.connect(otherAccount).safeMint(otherAccount2),
      ).revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
    });
  });

  // transferFrom(address from, address to, uint256 tokenId)
  // safeTransferFrom(address from, address to, uint256 tokenId)
  // safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
  describe("Transfer", function () {
    it("Owner can not transfer.", async function () {
      const { sbt, owner, otherAccount } = await loadFixture(deployFixture);
      await sbt.safeMint(owner);
      //await sbt.transferFrom(owner, otherAccount, 0)
      expect(
        await sbt.transferFrom(owner, otherAccount, 1),
      ).to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
    });
  });

  // burn(uint256 tokenId)

  // pause()
  // unpause()

  // approve(address to, uint256 tokenId)
  // setApprovalForAll(address operator, bool approved)
});
