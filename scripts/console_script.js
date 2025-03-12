cd Solidity\node_modules\hardhat

npx hardhat compile
npx hardhat node

npx hardhat run scripts/deploy.js --network localhost

npx hardhat console --network localhost

// Schedule messages
const deployedScheduleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const encryptedMessage = "m6NT1sFqHS5MPTYdbGhD4CjKrK3MNh7JEkefCDJgL26JeceRKKZKUAGR+XHKZJhm1/qUNWm77DjPhgjJEnXMJZOHU7LY4JN9zDvGkC/QtB6GpRPzqIqnE83Ap+w4C8mCQzuYBdGJ1UDsW6QLwiqiwotItVNUakDShy2znYs8ukcJxcgfi+ZSGtZEGuk/Gv13s40LTeVdGtZC481lzjcbjQzlAY8pc+0xPCFRDn38WjZm7rxiY+58hvn9gLBFQjpQpC7YKLJDZTcuWf24ztE2KRVYLE0SAHNv/oJN/GpSYoh1W/F/RTkpLGSzMpN3Mvnl6OuhOrd08Rf/HMbyzMSMeg==";


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
console.log("MessageReleased events:", await scheduledMessage.queryFilter(scheduledMessage.filters.MessageReleased(), await ethers.provider.getBlockNumber() - 18, await ethers.provider.getBlockNumber()));

// https://www.devglan.com/online-tools/rsa-encryption-decryption
/*
-----BEGIN RSA PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGpd9X0eTA1IKXKrQDHp/qKwqsaO7tUrHSnU5HNOtreHJih+3/P837Na2+VKLAWBzdaKiIy7VjrsjKBeHyQBdg5QH8hXaA5Kujx0YcwoG3Wx/MiGAbsbm+ykt0/50YnQ0TiyiqwzS51tEmDct77r36KAJ/ZTI1j+yg4OFsSAELP/6anaBP2f0BIapNrb0xBjIwzmjU+8w7K/YGVWtL8V19Rt4vBW6NVZymMHrWxRb0FRhc8RINVMVpbOxZGyBcZS85+PNk9NoeplxOiO2nCCx2ir2Bm1sAuILy/J13ft+uWdbl7bwx3oZzsL8FQU7+C13Gj0gGCDCDSFhOCAlZd/0xAgMBAAECggEAAhyTiyHxSrMlFPhzAGvormAeLQHL0DCz7V4XL3thWFMyDfoh4OA8hR7P+5q7Fb8idRmlUFvLDNoIxB02rw2ix+EVo9I1lavb+4sNj4IgBGaO62yZsmoWyU3qNFKUpwHUKyae/gVJP/YOi664wKEB/FltbLzj4tL6p+Iy0z/efHIH5yY5j+W4Q4DsBpfn71a9Kz/Gvd/1/A/qOksHNpSw6CzFI7Co5Itv0ZuVtr/SJDceXOnSc1XPZ7YPSta4CXmK8SOTDldwrfFB7/KtRVIz3LUT/XPV2Q/j12rxWfygvq18v1EzHfcVkHdGDXstkvVozsqR16xphgnt0i9Uod+d1wKBgQD9qZdxYmeQDPhJEHe1+YYAHLoqauTW7kvWVXJav3vRRQ/eY+GHLTbt7kE9V/Dvmee1YKa6ph+1Jtwsq38dsR5/HC4NFtI/pJ4QX88I4cSVmWaTX5basUKEjeuG/cb+yZiloJpqctqX7ZAY8LeGHSYG8MZRrxuFwBUd8WIxSZdZFwKBgQDIen9ezHH9QgQhBewjIb8d8JIdaZIGXBq0tcreDxwzBbW6ZS73Eo8+7IcUfKZbYlcQy9AwUPnwPmQhBujsu8XzJEP+91YqwtB51EtNRwnjLPs3SuFk7thilNH8v9+p6ZJ5YE434DAJVyQzWJSJeoXw8YkFm0Rhh00AlrrCmyw49wKBgE+3oHRtrIZEzTKJDlYOGOKoJIl4FnrFYOf26n1CeDMINTh6w0GsH/seSTpyDLH/+CW0PjGiS4yurbsMGmLGawMfZAmRBnohzdrvgS0VZqZtEyN1gv8vfewSfdZqosMnr+U9V8nkVnYwnnx4CfUH7A96U5kQIuIhv4EtfuJmcj35AoGBAIHjg/SKp2v7wqsWqDjW23ltbW2rAZYnRJJCmm6nAZE5KNXcSsJ/ftm464flfu8EVv6l3nv/awAxnDQdwvnmaskufPOLkoNf9yyH1EX8Oba7ZQQc+s2nRgERBMAqHKJ8l48WS3c+REE4+VZfFNXB0VgbVbiRMYuy2rv/7H67hLpfAoGAEy+syIx1SKOkW7C3faDlVNZQNu8c/2lPz3mNOlQaTm5M1Bt+x/coJjU5iPDInbQkfUBwZ2+Xsu/AlfvfPwu5pYhJsMtm+fxxblBRHhozaearBpbAJvsnnf3CFXCsnAMEUIOU5CZqnBI+EP77MMlYiaLnKD1NhYD3xU5pB1iBz5I=
-----END RSA PRIVATE KEY-----
*/