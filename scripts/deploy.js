async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Deploy ScheduledMessage
    const ScheduledMessage = await ethers.getContractFactory("ScheduledMessage");
    const scheduledMessage = await ScheduledMessage.deploy();
    await scheduledMessage.deployed();
    console.log("ScheduledMessage deployed at:", scheduledMessage.address);

    // Deploy ETHTransferTrigger with the ScheduledMessage address.
    const ETHTransferTrigger = await ethers.getContractFactory("ETHTransferTrigger");
    const ethTransferTrigger = await ETHTransferTrigger.deploy(scheduledMessage.address);
    await ethTransferTrigger.deployed();
    console.log("ETHTransferTrigger deployed at:", ethTransferTrigger.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
