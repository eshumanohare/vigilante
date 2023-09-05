const hre = require("hardhat");

async function main() {
  await hre.run("compile");
  const VigilanteFactory = await hre.ethers.getContractFactory(
    "VigilanteFactory"
  );
  const vigilanteFactory = await VigilanteFactory.deploy();
  await vigilanteFactory.waitForDeployment();
  console.log(`Factory deployed at: ${vigilanteFactory.address}`);

  const departmentID = 1;
  const official = "0x212115605D68724c18894B18cF194D2cbfbaA9d9";
  const tx = await vigilanteFactory.createCore(departmentID, official);
  await tx.wait();
  console.log(`Address of Core: ${tx}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
