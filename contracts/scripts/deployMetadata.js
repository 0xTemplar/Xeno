// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const main = async () => {
  //Import contracts to deploy
  const XenoMetadata = await hre.ethers.getContractFactory("XenoMetadata");
  const xenoMetadata = await XenoMetadata.deploy();
  await xenoMetadata.deployed();
  console.log("Xeno Metadata Contract deployed to:", xenoMetadata.address);
};

// Xeno Metadata Contract deployed to: 0xf9159A129145eB695c33D8920787119dfcbE0c24
// resolver Address:
// Domain Sbt resolver address:
// XenoDomainHub deployed to:
// XenoDomainFactory deployed to:
// forbiddenTlds deployed to:
// XenoDomainSBTFactory deployed to:

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
