import { network } from "hardhat";

async function main() {
    // Following your successful pattern
    const { ethers, networkName } = await network.connect();
    const [deployer, otherAccount] = await ethers.getSigners();

    // 1. UPDATE THIS ADDRESS with the one from your terminal output
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const voting = await ethers.getContractAt("IRVVoting", contractAddress);

    console.log(`--- Interacting with IRVVoting on ${networkName} ---`);

    // 2. Setup Poll Data
    const title = "Hardware Choice 2026";
    const initialVoters = [deployer.address]; // Adding yourself at start
    const candidates = ["ASUS TUF F15", "MacBook M3", "ThinkPad P1"];
    const auditors = [];
    const startTime = Math.floor(Date.now() / 1000) + 30; // Starts in 30 seconds
    const endTime = startTime + 3600; // Ends in 1 hour
    const maxChoices = 3;

    // 3. Test: Create Poll
    console.log("Creating poll...");
    const createTx = await voting.createPoll(
        title,
        initialVoters,
        candidates,
        auditors,
        0, // Assuming 0 is IRV in your enum
        startTime,
        endTime,
        maxChoices
    );
    const createReceipt = await createTx.wait();
    const pollId = 0; // The first poll created in this session
    console.log(`Poll Created! Gas used: ${createReceipt.gasUsed.toString()}`);

    // 4. Test: Batch Whitelisting (The "Split" strategy)
    console.log(`Adding ${otherAccount.address} to whitelist via batch...`);
    const newVoters = [otherAccount.address];
    const batchTx = await voting.addVotersToWhitelist(pollId, newVoters);
    const batchReceipt = await batchTx.wait();
    console.log(`Batch added! Gas used: ${batchReceipt.gasUsed.toString()}`);

    // 5. Verification
    const isVoter1Allowed = await voting.isAllowedVoter(pollId, deployer.address);
    const isVoter2Allowed = await voting.isAllowedVoter(pollId, otherAccount.address);

    console.log("\n--- Whitelist Verification ---");
    console.log(`Deployer Allowed: ${isVoter1Allowed}`);
    console.log(`Other Account Allowed: ${isVoter2Allowed}`);

    if (isVoter1Allowed && isVoter2Allowed) {
        console.log("\nSUCCESS: Both initial and batched voters are whitelisted.");
    } else {
        console.log("\nFAILURE: One or more voters not found in mapping.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});