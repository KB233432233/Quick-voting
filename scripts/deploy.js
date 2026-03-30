
////////////////////////////////////
// this works with viem 30-3-2026//
//////////////////////////////////

import { network } from "hardhat";

async function main() {
    const { viem } = await network.connect();

    // const client = await viem.getPublicClient();
    // const tx = await irvvoting.write.getUserRole([irvvoting.address]);
    // await client.waitForTransactionReceipt({ hash: tx, confirmations: 1 });

    const [deployer] = await viem.getWalletClients();
    const ownerAddress = deployer.account.address;
    console.log("Deployer address:", ownerAddress);

    const irvvoting = await viem.deployContract("IRVVoting");
    console.log("IRVVoting address:", irvvoting.address);

    const role = await irvvoting.read.getUserRole([ownerAddress]);
    console.log("User role:", role);

    console.log("Deployment successful!");

}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});




//////////////////////////////////////////////////////////////////////////////////////////////////////
// this deploy script works with npx hardhat run scripts/deploy.js --network hardhat using node 22///
////////////////////////////////////////////////////////////////////////////////////////////////////
//old//

// import { network } from "hardhat";

// async function main() {
//     // 1. Connect and get Signer
//     const { ethers } = await network.connect();
//     const [deployer] = await ethers.getSigners();

//     console.log("----------------------------------------------------");
//     // console.log("Deploying IRVVoting to:", network.name);
//     const connection = await network.connect();
//     console.log("Deploying IRVVoting to:", connection.networkName);
//     console.log("Deployer Address:", deployer.address);
//     console.log("----------------------------------------------------");

//     // 2. Deploy the Contract 
//     // Note: No arguments here because your constructor() is empty!
//     const irvVoting = await ethers.deployContract("IRVVoting");
//     await irvVoting.waitForDeployment();

//     const contractAddress = await irvVoting.getAddress();
//     console.log("✅ Contract deployed to:", contractAddress);

//     // 3. Create your first Poll (Optional but helpful for testing)
//     console.log("\nCreating initial sample poll...");

//     const title = "First Quick-Voting Poll";
//     const voters = [
//         "0x0000000000000000000000000000000000000001",
//         "0x0000000000000000000000000000000000000002"
//     ];
//     const names = ["Alice", "Bob", "Charlie"];
//     const images = ["img_url_1", "img_url_2", "img_url_3"];
//     const descriptions = ["Visionary", "Pragmatist", "Innovator"];
//     const auditors = [deployer.address]; // Adding yourself as an auditor

//     const startTime = Math.floor(Date.now() / 1000) + 60; // Starts in 1 minute
//     const endTime = startTime + 3600; // Lasts 1 hour
//     const publicViewable = true;

//     const tx = await irvVoting.createPoll(
//         title,
//         voters,
//         names,
//         images,
//         descriptions,
//         auditors,
//         startTime,
//         endTime,
//         publicViewable
//     );

//     const receipt = await tx.wait();
//     console.log("✅ Sample Poll Created! TX Hash:", receipt.hash);
//     console.log("----------------------------------------------------");
// }

// main().catch((err) => {
//     console.error(err);
//     process.exit(1);
// });


///////////////
//this works//
/////////////
//old//

// import { network } from "hardhat";

// async function main() {
//     const { ethers } = await network.connect();
//     const [deployer] = await ethers.getSigners();

//     console.log("Deploying IRVVoting with account:", deployer.address);

//     // 1. Deploy (Notice the [] is empty because the constructor is empty)
//     const irvVoting = await ethers.deployContract("IRVVoting", []);

//     await irvVoting.waitForDeployment();

//     const address = await irvVoting.getAddress();
//     console.log("✅ Contract deployed to:", address);

//     // Save this address! You will need it for your frontend/scripts.
// }

// main().catch((error) => {
//     console.error(error);
//     process.exit(1);
// });



