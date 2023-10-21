// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

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
// resolver Address: 0xF0E3193c1A6dDdC3C03bCb81E81bD3ceB69dE817
// Domain Sbt resolver address: 0x803F929Fa64dD93D50Bf0186416813F6A339f867
// xenoDomainHub deployed to:  0x84FF00826d9B63761C3455959aA3c71A0797F92b
// xenoDomainFactory deployed to:  0x557a39105A2868Eb300814ac6a14DA174bFe20fC
// forbiddenTlds deployed to:  0xa8622A52C4fa5f2352107b1D5d7266EBd733Ffc1
// xenoDomainSBTFactory deployed to:  0x76c2Fb337839D6ca02ce268BC6d4b8E55c96b875

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
