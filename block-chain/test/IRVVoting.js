import { expect } from "chai";
import hre from "hardhat";

describe("IRVVoting Contract", function () {
    let irvVoting;
    let owner, voter1, voter2, nonVoter;

    // Fixed: Combined the "before" check into one block
    before(async function () {
        if (!hre.ethers) {
            // Short delay to let Node 20 finish loading plugins
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (!hre.ethers) {
            throw new Error("Ethers plugin still not detected. Ensure '@nomicfoundation/hardhat-toolbox-mocha-ethers' is imported in hardhat.config.js");
        }
    });

    beforeEach(async function () {
        const signers = await hre.ethers.getSigners();
        owner = signers[0];
        voter1 = signers[1];
        voter2 = signers[2];
        nonVoter = signers[3];

        irvVoting = await hre.ethers.deployContract("IRVVoting");
        await irvVoting.waitForDeployment();
    });

    describe("Poll Creation", function () {
        it("Should allow owner to create a poll", async function () {
            const startTime = Math.floor(Date.now() / 1000) + 10;
            const endTime = startTime + 3600;

            await expect(irvVoting.createPoll(
                "Test Poll",
                [voter1.address, voter2.address],
                ["Alice", "Bob"],
                ["img1", "img2"],
                ["Desc1", "Desc2"],
                [owner.address],
                startTime,
                endTime,
                true
            )).to.emit(irvVoting, "PollCreated");
        });

        it("Should fail if a non-owner tries to create a poll", async function () {
            await expect(irvVoting.connect(voter1).createPoll(
                "Fake Poll", [], [], [], [], [], 0, 0, true
            )).to.be.reverted;
        });
    });

    describe("Voting Logic", function () {
        beforeEach(async function () {
            const startTime = Math.floor(Date.now() / 1000) - 10;
            const endTime = startTime + 3600;

            await irvVoting.createPoll(
                "Election",
                [voter1.address, voter2.address],
                ["Alice", "Bob"],
                ["img1", "img2"],
                ["D1", "D2"],
                [],
                startTime,
                endTime,
                true
            );
        });

        it("Should allow a whitelisted voter to vote", async function () {
            await irvVoting.connect(voter1).vote(0, [0, 1]);
            expect(await irvVoting.hasUserVoted(0, voter1.address)).to.equal(true);
        });

        it("Should reject a vote from someone not whitelisted", async function () {
            await expect(irvVoting.connect(nonVoter).vote(0, [0, 1]))
                .to.be.reverted;
        });

        it("Should prevent double voting", async function () {
            await irvVoting.connect(voter1).vote(0, [0, 1]);
            await expect(irvVoting.connect(voter1).vote(0, [0, 1]))
                .to.be.reverted;
        });
    });

    describe("Instant Runoff Math", function () {
        it("Should correctly eliminate the loser and pick the second-choice winner", async function () {
            const startTime = Math.floor(Date.now() / 1000) - 10;
            const endTime = startTime + 3600;

            await irvVoting.createPoll(
                "IRV Test",
                [owner.address, voter1.address, voter2.address],
                ["Alice", "Bob", "Charlie"],
                ["img", "img", "img"],
                ["A", "B", "C"],
                [],
                startTime,
                endTime,
                true
            );

            await irvVoting.connect(owner).vote(0, [0, 1, 2]);
            await irvVoting.connect(voter1).vote(0, [1, 0, 2]);
            await irvVoting.connect(voter2).vote(0, [2, 1, 0]);

            await hre.network.provider.send("evm_increaseTime", [3601]);
            await hre.network.provider.send("evm_mine");

            await irvVoting.finalizePoll(0);

            const poll = await irvVoting.getPollDetails(0);
            expect(poll.winnerId).to.equal(1);
        });
    });
});
















// import { expect } from "chai";

// import { network } from "hardhat";



// describe("IRVVoting Contract", function () {

//     let irvVoting;

//     let owner;

//     let voter1;

//     let voter2;

//     let nonVoter;



//     beforeEach(async function () {

//         // Hardhat 3/EDR connection

//         const { ethers } = await network.connect();

//         [owner, voter1, voter2, nonVoter] = await ethers.getSigners();



//         // Deploy fresh contract for every test

//         irvVoting = await ethers.deployContract("IRVVoting");

//         await irvVoting.waitForDeployment();

//     });



//     describe("Poll Creation", function () {

//         it("Should allow owner to create a poll", async function () {

//             const startTime = Math.floor(Date.now() / 1000) + 10;

//             const endTime = startTime + 3600;



//             // Updated to use .emit() correctly

//             await expect(irvVoting.createPoll(

//                 "Test Poll",

//                 [voter1.address, voter2.address],

//                 ["Alice", "Bob"],

//                 ["img1", "img2"],

//                 ["Desc1", "Desc2"],

//                 [owner.address],

//                 startTime,

//                 endTime,

//                 true

//             )).to.emit(irvVoting, "PollCreated");

//         });



//         it("Should fail if a non-owner tries to create a poll", async function () {

//             // Updated syntax: call .reverted() as a function

//             await expect(irvVoting.connect(voter1).createPoll(

//                 "Fake Poll", [], [], [], [], [], 0, 0, true

//             )).revert();

//         });

//     });



//     describe("Voting Logic", function () {

//         beforeEach(async function () {

//             // Setup a poll for these tests (Start time in the past to allow voting)

//             const startTime = Math.floor(Date.now() / 1000) - 10;

//             const endTime = startTime + 3600;



//             await irvVoting.createPoll(

//                 "Election",

//                 [voter1.address, voter2.address],

//                 ["Alice", "Bob"],

//                 ["img1", "img2"],

//                 ["D1", "D2"],

//                 [],

//                 startTime,

//                 endTime,

//                 true

//             );

//         });



//         it("Should allow a whitelisted voter to vote", async function () {

//             // Simply executing the transaction is often enough to prove success

//             await irvVoting.connect(voter1).vote(0, [0, 1]);



//             expect(await irvVoting.hasUserVoted(0, voter1.address)).to.equal(true);

//         });



//         it("Should reject a vote from someone not whitelisted", async function () {

//             // Updated syntax: call .reverted() as a function

//             await expect(irvVoting.connect(nonVoter).vote(0, [0, 1]))

//                 .revert();

//         });



//         it("Should prevent double voting", async function () {

//             await irvVoting.connect(voter1).vote(0, [0, 1]);



//             // Updated syntax: call .reverted() as a function

//             await expect(irvVoting.connect(voter1).vote(0, [0, 1]))

//                 .revert();

//         });

//     });

// });