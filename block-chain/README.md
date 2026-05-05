# Sample Hardhat 3 Beta Project (`mocha` and `ethers`)

This project showcases a Hardhat 3 Beta project using `mocha` for tests and the `ethers` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using `mocha` and ethers.js
- Examples demonstrating how to connect to different types of networks, including locally simulating OP mainnet.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `mocha` tests:

```shell
npx hardhat test solidity
npx hardhat test mocha
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```




notes:
1- off chain finalizing for gas problems
2- make it gasless(meta tx, ERC 2771)
3- use chainlink and upkeep to finalize automaticlly
4- blind sig

add org
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x64B366a05827fE8289e93Ae10109ca0581ebb894";
const RPC_URL = "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97";
const PRIVATE_KEY = "9efb9c489ec960760e5adb1bcde1dd84a8210ed350583b5c6741bea4f55fdfe3";
const NEW_ORGANIZATION = "0x145cec381eb759B0a0cC5D1EA299b229D4280899";

const ABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "addOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}];

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    console.log(`Adding ${NEW_ORGANIZATION} as organization...`);
    const tx = await contract.addOrganization(NEW_ORGANIZATION);
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("✅ Organization added successfully!");
}

main().catch(console.error);

Deploying IRVVoting to sepolia...
Waiting for deployment...
Contract address: 0x04d27bBaE19dfE113EE3da06d0CA891110aB1705

15-4-2026
Deploying IRVVoting to sepolia...
Waiting for deployment...
Contract address: 0x64B366a05827fE8289e93Ae10109ca0581ebb894
User role: Owner
Gas used: 2177496
Deployment successful!

2-5-2026 after chainlink upkeep
Deploying IRVVoting to sepolia...
Waiting for deployment...
Contract address: 0x1ea940Ef1d39ED8a2E037b3E6d5A685bFe2B7c72
User role: Owner
Gas used: 2368121
Deployment successful!

5-5-2026 added chainlink upkeep, and fixed some logical errors
Deploying IRVVoting to sepolia...
Waiting for deployment...
Contract address: 0xA24EB41dF502e0C9C18d31FF8218a3AEa4F94AF0
User role: Owner
Gas used: 2313435
Deployment successful!



    "@nomicfoundation/hardhat-chai-matchers": "^2.1.2",
    "@nomicfoundation/hardhat-ethers": "^3.1.3",
    "@nomicfoundation/hardhat-ignition": "^3.1.0",
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "@nomicfoundation/hardhat-toolbox-mocha-ethers": "^3.0.3",
    "@types/chai": "^5.2.3",
    "@types/chai-as-promised": "^8.0.2",
    "@types/mocha": "^10.0.10",
    "chai": "^4.5.0",
    "ethers": "^6.16.0",
    "forge-std": "github:foundry-rs/forge-std#v1.9.4",
    "hardhat": "^3.2.0",
    "hardhat-deploy": "^0.12.4",
    "mocha": "^11.7.5",