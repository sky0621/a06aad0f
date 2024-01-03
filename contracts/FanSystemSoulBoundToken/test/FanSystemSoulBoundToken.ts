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
      await expect(
        sbt.connect(otherAccount).safeMint(otherAccount2),
      ).revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
    });
  });

  // transferFrom(address from, address to, uint256 tokenId)
  // safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
  describe("Transfer", function () {
    it("Owner can not transfer.", async function () {
      const { sbt, owner, otherAccount } = await loadFixture(deployFixture);
      await sbt.safeMint(owner);
      await expect(
        sbt.transferFrom(owner, otherAccount, 0),
      ).revertedWithCustomError(sbt, "ErrLocked");
      const safeTransferFrom =
        sbt["safeTransferFrom(address,address,uint256,bytes)"];
      await expect(
        safeTransferFrom(owner, otherAccount, 0, ethers.toUtf8Bytes("")),
      ).revertedWithCustomError(sbt, "ErrLocked");
    });

    it("Not owner can not transfer.", async function () {
      const { sbt, owner, otherAccount, otherAccount2 } =
        await loadFixture(deployFixture);
      await sbt.safeMint(owner);
      await expect(
        sbt.connect(otherAccount).transferFrom(owner, otherAccount, 0),
      ).revertedWithCustomError(sbt, "ErrLocked");
      const safeTransferFrom =
        sbt.connect(otherAccount)[
          "safeTransferFrom(address,address,uint256,bytes)"
        ];
      await expect(
        safeTransferFrom(owner, otherAccount, 0, ethers.toUtf8Bytes("")),
      ).revertedWithCustomError(sbt, "ErrLocked");
    });
  });

  // approve(address to, uint256 tokenId)
  // setApprovalForAll(address operator, bool approved)
  describe("Approve", function () {
    it("Owner can not approve.", async function () {
      const { sbt, owner, otherAccount } = await loadFixture(deployFixture);
      await expect(sbt.approve(otherAccount, 0)).revertedWithCustomError(
        sbt,
        "ErrLocked",
      );
      await expect(sbt.setApprovalForAll(owner, true)).revertedWithCustomError(
        sbt,
        "ErrLocked",
      );
    });

    it("Not owner can not approve.", async function () {
      const { sbt, owner, otherAccount } = await loadFixture(deployFixture);
      await expect(
        sbt.connect(otherAccount).approve(otherAccount, 0),
      ).revertedWithCustomError(sbt, "ErrLocked");
      await expect(
        sbt.connect(otherAccount).setApprovalForAll(owner, true),
      ).revertedWithCustomError(sbt, "ErrLocked");
    });
  });

  // burn(uint256 tokenId)

  // pause()
  // unpause()
});
