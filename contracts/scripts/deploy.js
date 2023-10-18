// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  //Import contracts to deploy
  const XenoDomainFactory = await hre.ethers.getContractFactory(
    "XenoDomainFactoryV2"
  );

  const xenoDomainSBTFactory = await hre.ethers.getContractFactory(
    "XenoDomainSBTFactory"
  );

  const XenoDomainHub = await hre.ethers.getContractFactory("XenoDomainHub");

  const XenoDomainResolver = await hre.ethers.getContractFactory(
    "XenoDomainResolver"
  );

  const XenoSBTDomainResolver = await hre.ethers.getContractFactory(
    "XenoSBTDomainResolver"
  );

  const ForbiddenTlds = await hre.ethers.getContractFactory("ForbiddenTldsV2");

  const metadataAddress = "0xf9159A129145eB695c33D8920787119dfcbE0c24";

  const royaltyAddress = "0x0a7A7e96B6E642e56e1bb92EbFfFf1EfD5F85534";

  const xenoHub = await XenoDomainHub.deploy(metadataAddress);
  await xenoHub.deployed();
  const hubAddress = xenoHub.address;

  const xenoResolver = await upgrades.deployProxy(XenoDomainResolver);
  const domainSbtResolver = await upgrades.deployProxy(XenoSBTDomainResolver);
  await xenoResolver.deployed();
  await domainSbtResolver.deployed();
  const resolverAddress = xenoResolver.address;
  const domainSbtResolverAddress = domainSbtResolver.address;
  console.log("resolver Address:", resolverAddress);
  console.log("Domain Sbt resolver address:", domainSbtResolverAddress);

  await xenoResolver.addHubAddress(hubAddress, { gasLimit: 3000000 });
  await domainSbtResolver.addHubAddress(hubAddress, { gasLimit: 3000000 });

  const forbiddenTlds = await ForbiddenTlds.deploy(hubAddress);
  await forbiddenTlds.deployed();
  const forbiddenTldsAddress = forbiddenTlds.address;

  const xenoFactory = await XenoDomainFactory.deploy(
    0,
    forbiddenTldsAddress,
    metadataAddress,
    hubAddress,
    royaltyAddress
  );
  await xenoFactory.deployed();
  const factoryAddress = xenoFactory.address;

  await xenoResolver.addFactoryAddress(factoryAddress);

  await forbiddenTlds.addFactoryAddress(factoryAddress);

  const init = await xenoHub.init(xenoFactory.address, forbiddenTldsAddress);
  await init.wait();

  const toogle = await xenoFactory.toggleBuyingTlds();
  await toogle.wait();

  console.log("xenoDomainHub deployed to: ", hubAddress);
  console.log("xenoDomainFactory deployed to: ", factoryAddress);
  console.log("forbiddenTlds deployed to: ", forbiddenTldsAddress);

  const xenoSBTFactory = await xenoDomainSBTFactory.deploy(
    0,
    forbiddenTldsAddress,
    metadataAddress,
    hubAddress,
    royaltyAddress
  );
  await xenoSBTFactory.deployed();
  const sbtFactoryAddress = xenoSBTFactory.address;
  await domainSbtResolver.addFactoryAddress(sbtFactoryAddress);

  console.log("xenoDomainSBTFactory deployed to: ", sbtFactoryAddress);

  await forbiddenTlds.addFactoryAddress(sbtFactoryAddress);

  const sbtInit = await xenoHub.initSBT(xenoSBTFactory.address);
  await sbtInit.wait();

  const sbtToggle = await xenoSBTFactory.toggleBuyingTlds();
  await sbtToggle.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
