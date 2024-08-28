const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  const pepeCoinFactory = await hre.ethers.getContractFactory("PepeCoin");
  const pepeCoinsContract = await pepeCoinFactory.deploy()

  const refersFactory = await hre.ethers.getContractFactory("ReferralAndTasks");
  const refersContract = await refersFactory.deploy();
  
  
  // Deploy the contract
  await pepeCoinsContract.deployed();
  await transactionsContract.deployed();
  await refersContract.deployed();
  
  console.log("PepeCoin deployed to:", pepeCoinsContract.address);
    console.log("Transactions address: ", transactionsContract.address);
  console.log("Refer deployed to:", refersContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();