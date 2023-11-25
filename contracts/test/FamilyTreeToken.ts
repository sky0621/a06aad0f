import { ethers } from "hardhat";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {expect} from "chai";

describe("FamilyTreeToken", function (){
    async function deployFixture() {
        const [owner] = await ethers.getSigners()
        const FamilyTreeToken = await ethers.getContractFactory("FamilyTreeToken")
        const familyTreeToken = await FamilyTreeToken.deploy()
        return {familyTreeToken, owner}
    }

    describe("Deployment", function () {
        it('should set the right name', async () => {
            const {familyTreeToken} = await loadFixture(deployFixture)
            expect(await familyTreeToken.name()).to.equal("FamilyTreeToken")
        });

        it('should set the right symbol', async () => {
            const {familyTreeToken} = await loadFixture(deployFixture)
            expect(await familyTreeToken.symbol()).to.equal("FTT")
        });
    })
})