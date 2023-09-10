const hre = require("hardhat");
const fs = require("fs");
const sampleFIR = require("../sampleFIR.json");
const coreABI = require("./coreABI.json");

async function main() {
  await hre.run("compile");

  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY);

  const coreAddresses = [];

  const accounts = ["0x5A8c5abFb59B11c614cFEc65F9c13c6857321b98"];

  const VigilanteFactory = await hre.ethers.getContractFactory(
    "VigilanteFactory"
  );

  const vigilanteFactory = await VigilanteFactory.deploy();
  await vigilanteFactory.waitForDeployment();

  console.log(`Factory deployed at: ${vigilanteFactory.target}`);

  async function deployCore(departmentID, official) {
    const core = await vigilanteFactory.createCore(departmentID, official);
    await core.wait();
    const coreAddr = await vigilanteFactory.allCores(departmentID);
    coreAddresses.push(coreAddr);
  }

  for (let i = 1; i <= 1; i++) {
    await deployCore(i, accounts[i - 1]);
  }

  // Write coreInstances to a JSON file
  fs.writeFileSync(
    "coreAddresses.json",
    JSON.stringify(coreAddresses, null, 2)
  );

  async function getCoreInstance(coreAddr) {
    const core_i = await hre.ethers.getContractAt(
      coreABI.abi,
      coreAddr,
      wallet.address
    );
    console.log(core_i);
    return core_i;
  }

  async function registerFIR(coreAddr, officialAddr, data) {
    // getting the instance from the address
    const coreInstance = await getCoreInstance(coreAddr);
    const tx = await coreInstance.registerFIR(
      data.caseID,
      data.officer,
      data.incident,
      data.complainant,
      data.suspects,
      data.witnesses,
      data.evidences
    );
    await tx.wait();
    console.log(`Case Registered with caseID: ${data.caseID}`);
  }

  for (let i = 0; i < 1; i++) {
    let fir_i_dept = sampleFIR[i + 1];
    for (let j = 0; j < fir_i_dept.length; j++) {
      await registerFIR(coreAddresses[i], accounts[i], fir_i_dept[j]);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
