cd Solidity\node_modules\hardhat

npx hardhat compile
npx hardhat node

npx hardhat run scripts/deploy.js --network localhost

npx hardhat console --network localhost

// Schedule messages
const deployedScheduleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const encryptedMessage = "K/7D5HCgz/qwrJeJmKoMLN/xxOSaHXsgU68dvK6+QwM8UjZJS3PZY0hskOSpDwtwiE8DXhaou7z/WLEOgf+DJQCp+AhQ/FuQNzb+TEykv1GYtkqfVoVc5vbJqvkp2IJUA6cXzoo2HD7UfkuGY5X+hxkllkh5yiRvdXmEPS8k1nHbOglTIK2K6p5oxOZGGVbdAejp6keAbSsZbGWGHw+NVssudGYAgCTUvJSq5FoV3Avc1DMCNxekpU/WCkbOO9DNGdOiAInd6Bi7FH3z4TKB7WAWC5XkKmQMtj7CWp/oPBbfdq4LdBUfJEcin+cHDQQYPPF84G8SM69RuemKDXowSUH72E5OtXHURo+nqhS/VLfP5CFxmaBHHfYrXp8O3wa74F4WPpoqnuHxCCvxmF1yHaVH9TtxpgDDKmbwNKxciWn8FJAaIS0QK0le12+3Oku+4NnOihN6FKW87AOP2pqTz2OXo1regKnBbJXizfQWQ98bvGmVS1JuOMqBYTlwlFuqGckwFyPNri3D0iay3+OxdJQtTNkVAUrD3O6rY5yMEQeNOUmnMEDOMI4kRcSb35DtQZFkXVMqayKYHZvRsR6fcwnMcwx5fRXWui6k9vzwvNdt9z5/wwO1ckkA7qmpRDhJ7YWtYzIIfRk4suy+HOyoTCu8vI4b5tGquUfuexw2hXA=";


const scheduledMessage = await ethers.getContractAt("ScheduledMessage", deployedScheduleAddress);

const hint = "Vratnice";
const tx = await scheduledMessage.scheduleMessage(encryptedMessage, 5, hint);
await tx.wait();

// Send crypto
const deployedTransferTriggerAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ethTransferTrigger = await ethers.getContractAt("ETHTransferTrigger", deployedTransferTriggerAddress);
const [accountA, accountB] = await ethers.getSigners();
const triggerWithA = ethTransferTrigger.connect(accountA);
await triggerWithA.transferAndTrigger(accountB.address, { value: ethers.utils.parseEther("0.1") });


// View messages
const deployedScheduleAddressCpy = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const currentBlock5 = await ethers.provider.getBlockNumber();
const filter5 = scheduledMessage.filters.MessageReleased();
const events6 = await scheduledMessage.queryFilter(scheduledMessage.filters.MessageReleased(), await ethers.provider.getBlockNumber() - 18, await ethers.provider.getBlockNumber());
console.log("MessageReleased events:", await scheduledMessage.queryFilter(scheduledMessage.filters.MessageReleased(), await ethers.provider.getBlockNumber() - 18, await ethers.provider.getBlockNumber()));

