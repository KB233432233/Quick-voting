// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments;
//     const { deployer } = await getNamedAccounts();

//     log("----------------------------------------------------");
//     log("Deploying IRVVoting...");

//     const irvVoting = await deploy("IRVVoting", {
//         from: deployer,
//         args: [], // Your constructor is empty, so this stays empty
//         log: true,
//         waitConfirmations: 1, // How many blocks to wait
//     });

//     log(`✅ IRVVoting deployed at: ${irvVoting.address}`);
//     log("----------------------------------------------------");
// };

// module.exports.tags = ["all", "irvvoting"];


// deploy/01-deploy-irvvoting.js

// const deployFunction = async (hre) => {
//     const { getNamedAccounts, deployments } = hre;
//     const { deploy, log } = deployments;
//     const { deployer } = await getNamedAccounts();

//     log("----------------------------------------------------");
//     log("Deploying IRVVoting via hardhat-deploy...");

//     const irvVoting = await deploy("IRVVoting", {
//         from: deployer,
//         args: [],
//         log: true,
//         // Using 1 for local, but usually more for live networks
//         waitConfirmations: 1,
//     });

//     log(`✅ IRVVoting deployed at: ${irvVoting.address}`);
//     log("----------------------------------------------------");

//     // To apply your "Read" concept here:
//     const irvContract = await hre.viem.getContractAt("IRVVoting", irvVoting.address);
//     const role = await irvContract.read.getUserRole([deployer]);
//     log(`Verification - Deployer Role: ${role}`);
// };

// export default deployFunction;
// deployFunction.tags = ["all", "irvvoting"];