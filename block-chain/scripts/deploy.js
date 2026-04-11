
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

