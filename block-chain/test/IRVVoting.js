import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("IRVVoting", function () {
    let irvVoting;
    let owner;
    let org;
    let voter1;
    let voter2;
    let voter3;
    let auditor;
    let nonAllowedUser;

    const VoteType = {
        IRV: 0,
        MAJORITY: 1,
    };

    beforeEach(async function () {
        [owner, org, voter1, voter2, voter3, auditor, nonAllowedUser] =
            await ethers.getSigners();

        const IRVVoting = await ethers.getContractFactory("IRVVoting");
        irvVoting = await IRVVoting.deploy();
        await irvVoting.waitForDeployment();

        // Set up roles
        await irvVoting.addOrganization(org.address);
        await irvVoting.addAuditor(auditor.address);
    });

    describe("createPoll", function () {
        it("Should create a poll with valid parameters", async function () {
            const now = await time.latest();
            const startTime = now + 3600; // 1 hour from now
            const endTime = now + 7200; // 2 hours from now
            const title = "Test Poll";
            const candidates = ["Candidate A", "Candidate B", "Candidate C"];

            const tx = await irvVoting
                .connect(org)
                .createPoll(
                    title,
                    [],
                    candidates,
                    VoteType.IRV,
                    startTime,
                    endTime,
                    2
                );

            const receipt = await tx.wait();

            // Check that event was emitted
            expect(receipt.logs.length).to.be.greaterThan(0);

            // Verify poll was created
            const pollCount = await irvVoting.pollCount();
            expect(pollCount).to.equal(1);
        });

        it("Should create a poll with whitelist voters", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const voters = [voter1.address, voter2.address];
            const candidates = ["Candidate A", "Candidate B"];

            await irvVoting
                .connect(org)
                .createPoll(
                    "Whitelisted Poll",
                    voters,
                    candidates,
                    VoteType.MAJORITY,
                    startTime,
                    endTime,
                    1
                );

            // Verify voters are allowed
            const voter1Allowed = await irvVoting.isAllowedVoter(0, voter1.address);
            const voter2Allowed = await irvVoting.isAllowedVoter(0, voter2.address);

            expect(voter1Allowed).to.be.true;
            expect(voter2Allowed).to.be.true;
        });

        it("Should create a poll with IRV vote type", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B", "C"];

            await irvVoting
                .connect(org)
                .createPoll(
                    "IRV Poll",
                    [],
                    candidates,
                    VoteType.IRV,
                    startTime,
                    endTime,
                    3
                );

            const details = await irvVoting.getPollDetails(0);
            expect(details.voteType).to.equal(VoteType.IRV);
            expect(details.maxChoices).to.equal(3);
        });

        it("Should create a poll with MAJORITY vote type and maxChoices=1", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B"];

            await irvVoting
                .connect(org)
                .createPoll(
                    "Majority Poll",
                    [],
                    candidates,
                    VoteType.MAJORITY,
                    startTime,
                    endTime,
                    5 // Should be overridden to 1 for MAJORITY
                );

            const details = await irvVoting.getPollDetails(0);
            expect(details.voteType).to.equal(VoteType.MAJORITY);
            expect(details.maxChoices).to.equal(1);
        });

        it("Should increment pollCount for each new poll", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B"];

            let count = await irvVoting.pollCount();
            expect(count).to.equal(0);

            await irvVoting
                .connect(org)
                .createPoll(
                    "Poll 1",
                    [],
                    candidates,
                    VoteType.MAJORITY,
                    startTime,
                    endTime,
                    1
                );
            count = await irvVoting.pollCount();
            expect(count).to.equal(1);

            await irvVoting
                .connect(org)
                .createPoll(
                    "Poll 2",
                    [],
                    candidates,
                    VoteType.MAJORITY,
                    startTime,
                    endTime,
                    1
                );
            count = await irvVoting.pollCount();
            expect(count).to.equal(2);
        });

        it("Should store poll details correctly", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const title = "Detailed Poll";
            const candidates = ["Option 1", "Option 2", "Option 3"];

            await irvVoting
                .connect(org)
                .createPoll(
                    title,
                    [],
                    candidates,
                    VoteType.IRV,
                    startTime,
                    endTime,
                    2
                );

            const details = await irvVoting.getPollDetails(0);
            expect(details.title).to.equal(title);
            expect(details.startTime).to.equal(startTime);
            expect(details.endTime).to.equal(endTime);
            expect(details.candidateCount).to.equal(3);
            expect(details.candidateNames).to.deep.equal(candidates);
        });

        it("Should associate poll with organization", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B"];

            await irvVoting
                .connect(org)
                .createPoll(
                    "Org Poll",
                    [],
                    candidates,
                    VoteType.MAJORITY,
                    startTime,
                    endTime,
                    1
                );

            const polls = await irvVoting.getPollsByOrg(org.address);
            expect(polls.length).to.equal(1);
            expect(polls[0]).to.equal(0);
        });

        it("Should emit PollCreated event", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const title = "Event Test Poll";
            const candidates = ["A", "B"];

            const tx = await irvVoting
                .connect(org)
                .createPoll(
                    title,
                    [],
                    candidates,
                    VoteType.MAJORITY,
                    startTime,
                    endTime,
                    1
                );

            await expect(tx)
                .to.emit(irvVoting, "PollCreated")
                .withArgs(0, org.address, title, candidates, startTime, endTime);
        });

        // Error cases
        it("Should revert if non-organization tries to create poll", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B"];

            await expect(
                irvVoting
                    .connect(voter1)
                    .createPoll(
                        "Unauthorized Poll",
                        [],
                        candidates,
                        VoteType.MAJORITY,
                        startTime,
                        endTime,
                        1
                    )
            ).to.be.revertedWithCustomError(irvVoting, "AccessDenied");
        });

        it("Should revert if owner creates poll with maxChoices = 0", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B"];

            await expect(
                irvVoting
                    .connect(owner)
                    .createPoll(
                        "Invalid Poll",
                        [],
                        candidates,
                        VoteType.IRV,
                        startTime,
                        endTime,
                        0
                    )
            ).to.be.revertedWithCustomError(irvVoting, "InvalidMaxChoices");
        });

        it("Should revert if maxChoices > candidate count", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;
            const candidates = ["A", "B"];

            await expect(
                irvVoting
                    .connect(owner)
                    .createPoll(
                        "Invalid Poll",
                        [],
                        candidates,
                        VoteType.IRV,
                        startTime,
                        endTime,
                        5
                    )
            ).to.be.revertedWithCustomError(irvVoting, "InvalidMaxChoices");
        });

        it("Should revert if no candidates provided", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 7200;

            await expect(
                irvVoting
                    .connect(owner)
                    .createPoll("No Candidates", [], [], VoteType.MAJORITY, startTime, endTime, 1)
            ).to.be.revertedWithCustomError(irvVoting, "InvalidCandidates");
        });

        it("Should revert if startTime >= endTime", async function () {
            const now = await time.latest();
            const startTime = now + 3600;
            const endTime = now + 1800; // Before startTime
            const candidates = ["A", "B"];

            await expect(
                irvVoting
                    .connect(owner)
                    .createPoll(
                        "Invalid Time",
                        [],
                        candidates,
                        VoteType.MAJORITY,
                        startTime,
                        endTime,
                        1
                    )
            ).to.be.revertedWithCustomError(irvVoting, "InvalidTime");
        });

        it("Should revert if startTime equals endTime", async function () {
            const now = await time.latest();
            const time_ = now + 3600;
            const candidates = ["A", "B"];

            await expect(
                irvVoting
                    .connect(owner)
                    .createPoll(
                        "Same Time",
                        [],
                        candidates,
                        VoteType.MAJORITY,
                        time_,
                        time_,
                        1
                    )
            ).to.be.revertedWithCustomError(irvVoting, "InvalidTime");
        });
    });

    describe("_updateState (via getPollDetails)", function () {
        let pollId;
        let startTime;
        let endTime;

        beforeEach(async function () {
            const now = await time.latest();
            startTime = now + 3600; // 1 hour from now
            endTime = now + 7200; // 2 hours from now
            const candidates = ["A", "B", "C"];

            await irvVoting
                .connect(org)
                .createPoll(
                    "State Test Poll",
                    [],
                    candidates,
                    VoteType.IRV,
                    startTime,
                    endTime,
                    2
                );
            pollId = 0;
        });

        it("Should return Created state before startTime", async function () {
            const details = await irvVoting.getPollDetails(pollId);
            // PollState.Created = 0
            expect(details.currentState).to.equal(0);
        });

        it("Should return Active state during voting period", async function () {
            // Move to middle of voting period
            await time.increaseTo(startTime + 1800); // Halfway through

            const details = await irvVoting.getPollDetails(pollId);
            // PollState.Active = 1
            expect(details.currentState).to.equal(1);
        });

        it("Should return Ended state after endTime", async function () {
            // Move past endTime
            await time.increaseTo(endTime + 1);

            const details = await irvVoting.getPollDetails(pollId);
            // PollState.Ended = 2
            expect(details.currentState).to.equal(2);
        });

        it("Should return Finalized state after poll is finalized", async function () {
            // Move to after endTime
            await time.increaseTo(endTime + 1);

            // Cast some votes so finalization works
            await time.increaseTo(startTime + 1);
            await irvVoting.connect(voter1).vote(pollId, [0]);

            // Finalize the poll
            await irvVoting.finalizePoll(pollId);

            const details = await irvVoting.getPollDetails(pollId);
            // PollState.Finalized = 3
            expect(details.currentState).to.equal(3);
        });

        it("Should transition through all states correctly", async function () {
            // State 0: Created
            let details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(0);

            // State 1: Active
            await time.increaseTo(startTime + 1);
            details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(1);

            // State 2: Ended
            await time.increaseTo(endTime + 1);
            details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(2);

            // Cast a vote and finalize
            await irvVoting.connect(voter1).vote(pollId, [0]);
            await irvVoting.finalizePoll(pollId);

            // State 3: Finalized
            details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(3);
        });

        it("Should stay in Active state while voting is ongoing", async function () {
            await time.increaseTo(startTime + 1);
            let details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(1);

            // Move closer to end but still in active period
            await time.increaseTo(endTime - 100);
            details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(1);
        });

        it("Should return Ended immediately after endTime", async function () {
            await time.increaseTo(endTime);
            const details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(2);
        });

        it("Should return Finalized persistently after finalization", async function () {
            await time.increaseTo(endTime + 1);
            await irvVoting.connect(voter1).vote(pollId, [0]);
            await irvVoting.finalizePoll(pollId);

            // Check state immediately after finalization
            let details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(3);

            // Move time forward further and check state is still Finalized
            await time.increase(10000);
            details = await irvVoting.getPollDetails(pollId);
            expect(details.currentState).to.equal(3);
        });
    });

    describe("Integration: createPoll and _updateState", function () {
        it("Should handle multiple polls with different states", async function () {
            const now = await time.latest();

            // Poll 1: starts in 1 hour
            const startTime1 = now + 3600;
            const endTime1 = now + 7200;

            // Poll 2: starts in 2 hours
            const startTime2 = now + 7200;
            const endTime2 = now + 10800;

            const candidates = ["A", "B"];

            await irvVoting
                .connect(org)
                .createPoll("Poll 1", [], candidates, VoteType.MAJORITY, startTime1, endTime1, 1);

            await irvVoting
                .connect(org)
                .createPoll("Poll 2", [], candidates, VoteType.MAJORITY, startTime2, endTime2, 1);

            // At this point, both should be Created
            let details1 = await irvVoting.getPollDetails(0);
            let details2 = await irvVoting.getPollDetails(1);
            expect(details1.currentState).to.equal(0);
            expect(details2.currentState).to.equal(0);

            // Move to Poll 1 active time
            await time.increaseTo(startTime1 + 100);
            details1 = await irvVoting.getPollDetails(0);
            details2 = await irvVoting.getPollDetails(1);
            expect(details1.currentState).to.equal(1); // Active
            expect(details2.currentState).to.equal(0); // Still Created

            // Move to Poll 2 active time
            await time.increaseTo(startTime2 + 100);
            details1 = await irvVoting.getPollDetails(0);
            details2 = await irvVoting.getPollDetails(1);
            expect(details1.currentState).to.equal(2); // Ended
            expect(details2.currentState).to.equal(1); // Active
        });
    });
});
