
////////////////////////////////////
//ethers working version 1-4-2026//
//////////////////////////////////

import { network } from "hardhat";

async function main() {
    const { ethers, networkName } = await network.connect();

    console.log(`Deploying IRVVoting to ${networkName}...`);

    const voting = await ethers.deployContract("IRVVoting");

    console.log("Waiting for deployment...");
    await voting.waitForDeployment();

    const address = await voting.getAddress();
    console.log("Contract address:", address);

    const [deployer] = await ethers.getSigners();
    const ownerAddress = await deployer.getAddress();

    const role = await voting.getUserRole(ownerAddress);
    console.log("User role:", role);

    const tx = voting.deploymentTransaction();
    const receipt = await tx.wait();

    console.log("Gas used:", receipt.gasUsed.toString());

    console.log("Deployment successful!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});


////////////////////////////////////
// this works with viem 30-3-2026//
//////////////////////////////////

// import { network } from "hardhat";

// async function main() {
//     const { viem } = await network.connect();

//     // const client = await viem.getPublicClient();
//     // const tx = await irvvoting.write.getUserRole([irvvoting.address]);
//     // await client.waitForTransactionReceipt({ hash: tx, confirmations: 1 });

//     const [deployer] = await viem.getWalletClients();
//     const ownerAddress = deployer.account.address;
//     console.log("Deployer address:", ownerAddress);

//     const irvvoting = await viem.deployContract("IRVVoting");
//     console.log("IRVVoting address:", irvvoting.address);

//     const role = await irvvoting.read.getUserRole([ownerAddress]);
//     console.log("User role:", role);

//     console.log("Deployment successful!");
// }

// main().catch((error) => {
//     console.error(error);
//     process.exit(1);
// });


