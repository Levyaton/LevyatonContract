# The Blockchain ARG PoC

> **A Proof of Concept of how blockchain can be utilized to create an immersive ARG experience that builds community, while also maintaining a coin-based crypto infrastructure.**

<div align="right">
  **by Levyaton**
</div>

---

## Overview

This repository uses files from [Hardhat](https://github.com/NomicFoundation/hardhat). I do not claim ownership of Hardhat; the only files I claim authorship of are:

- `index.html`
- `ArgBlockchain.png`
- The contents of the `contracts` and `scripts` folders
- The modifications made to `hardhat.config.js`

This README is designed to help you quickly bootstrap the PoC for this blockchain smart contract idea.

---

## Setup Instructions

### Step 1: Install Node.js and Hardhat

- **Node.js:** Download and install [Node.js](https://nodejs.org/).
- **Hardhat:** Follow the [Hardhat Tutorial](https://hardhat.org/tutorial) to install and set up Hardhat.

### Step 2: Clone the Repository

In your terminal, navigate to the repository root (where this README is located).

### Step 3: Start the Hardhat Node

Run the following command to start the local blockchain:

```bash
npx hardhat node
```
This starts a blockchain that, by default, automatically mines a new block every 30 seconds. It also supports a mempool that accepts multiple transactions per block. (These settings can be changed in hardhat.config.js.)

### Step 4: Deploy the Smart Contract
In a new terminal, deploy the smart contract using:

```bash
npx hardhat run scripts/deploy.js --network localhost
```
The scripts use fixed addresses for the demo, so no modifications are necessary.

### Step 5: Open the Hardhat Console
Launch the interactive console with:

```bash
npx hardhat console --network localhost
```
You can now interact with the blockchain using JavaScript.

## PoC Interaction
### Step 6: Schedule a Message
In the console, enter the following code block:

```javascript
const deployedScheduleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const encryptedMessage = "m6NT1sFqHS5MPTYdbGhD4CjKrK3MNh7JEkefCDJgL26JeceRKKZKUAGR+XHKZJhm1/qUNWm77DjPhgjJEnXMJZOHU7LY4JN9zDvGkC/QtB6GpRPzqIqnE83Ap+w4C8mCQzuYBdGJ1UDsW6QLwiqiwotItVNUakDShy2znYs8ukcJxcgfi+ZSGtZEGuk/Gv13s40LTeVdGtZC481lzjcbjQzlAY8pc+0xPCFRDn38WjZm7rxiY+58hvn9gLBFQjpQpC7YKLJDZTcuWf24ztE2KRVYLE0SAHNv/oJN/GpSYoh1W/F/RTkpLGSzMpN3Mvnl6OuhOrd08Rf/HMbyzMSMeg==";

const scheduledMessage = await ethers.getContractAt("ScheduledMessage", deployedScheduleAddress);

const hint = "Vratnice";
const tx = await scheduledMessage.scheduleMessage(encryptedMessage, 5, hint);
await tx.wait();
```
This splits the encrypted message into 5 segments, with the hint "Vratnice" stored as the 6th segment.
The message can later be decrypted using the provided private key (shown below).
Private Key (For Demo Purposes Only):

```swift
-----BEGIN RSA PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGpd9X0eTA1IKX
KrQDHp/qKwqsaO7tUrHSnU5HNOtreHJih+3/P837Na2+VKLAWBzdaKiIy7VjrsjK
BeHyQBdg5QH8hXaA5Kujx0YcwoG3Wx/MiGAbsbm+ykt0/50YnQ0TiyiqwzS51tEm
Dct77r36KAJ/ZTI1j+yg4OFsSAELP/6anaBP2f0BIapNrb0xBjIwzmjU+8w7K/YG
VWtL8V19Rt4vBW6NVZymMHrWxRb0FRhc8RINVMVpbOxZGyBcZS85+PNk9NoeplxO
iO2nCCx2ir2Bm1sAuILy/J13ft+uWdbl7bwx3oZzsL8FQU7+C13Gj0gGCDCDSFhO
CAlZd/0xAgMBAAECggEAAhyTiyHxSrMlFPhzAGvormAeLQHL0DCz7V4XL3thWFMy
Dfoh4OA8hR7P+5q7Fb8idRmlUFvLDNoIxB02rw2ix+EVo9I1lavb+4sNj4IgBGaO
62yZsmoWyU3qNFKUpwHUKyae/gVJP/YOi664wKEB/FltbLzj4tL6p+Iy0z/efHIH
5yY5j+W4Q4DsBpf
```

For encryption and decryption, I recommend using the [DevGlan RSA Tool](https://www.devglan.com/online-tools/rsa-encryption-decryption).

### Step 7: Simulate Transactions
To simulate chain transactions that trigger message releases, run the following code in the console:

```javascript
const deployedTransferTriggerAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ethTransferTrigger = await ethers.getContractAt("ETHTransferTrigger", deployedTransferTriggerAddress);
const [accountA, accountB] = await ethers.getSigners();
const triggerWithA = ethTransferTrigger.connect(accountA);
```
To simulate a transaction, run this code as many times as desired:

```javascript
await triggerWithA.transferAndTrigger(accountB.address, { value: ethers.utils.parseEther("0.1") });
```

Each transaction sends 0.1 ETH from Account A to Account B and triggers the smart contract logic. Only the first transaction in each block releases a queued message; additional transactions in the same block will not trigger another message.

### Step 8: Display Released Messages
To view the messages released by the contract from recent blocks, run:

```javascript
const currentBlock = await ethers.provider.getBlockNumber();
console.log("MessageReleased events:", await scheduledMessage.queryFilter(
  scheduledMessage.filters.MessageReleased(),
  currentBlock - 18,
  currentBlock
));
```

Adjust the number 18 as needed to inspect a different range of blocks.

## Conclusion
This PoC demonstrates how blockchain technology can be leveraged to create an immersive ARG experience where transactions trigger narrative events. Enjoy exploring the project, and feel free to suggest improvements!

Have a great day!

- Levyaton






