// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract IRVVoting is AutomationCompatibleInterface {
    // -------------------------
    // ERRORS
    // -------------------------
    error AlreadyVoted();
    error NotAllowedVoter();
    error PollDoesNotExist();
    error VotingNotStarted();
    error VotingEnded();
    error VotingIsActive();
    error VotingNotEnded();
    error InvalidCandidates();
    error InvalidRanking();
    error NotOwner();
    error NotOrg();
    error NoWinnerFound();
    error AccessDenied();
    error InvalidTime();
    error PollAlreadyFinalized();
    error NoVoteFound();
    error InvalidMaxChoices();

    // -------------------------
    // EVENTS
    // -------------------------
    event PollCreated(
        uint256 indexed pollId,
        address indexed creator,
        string title,
        string[] candidateNames,
        uint256 startTime,
        uint256 endTime
    );
    event VoteCast(uint256 indexed pollId, address indexed voter, uint256 timestamp);
    event PollFinalized(uint256 indexed pollId, uint256 winnerIndex);
    event RoundTally(uint256 indexed pollId, uint256 round, uint256[] voteCounts);

    // -------------------------
    // STORAGE
    // -------------------------
    address public owner;

    struct Poll {
        string title;
        uint256 startTime;
        uint256 endTime;
        bool exists;
        bool finalized;
        uint256 maxChoices;
        uint256 winnerIndex;
        VoteType voteType;
        string[] candidates;
        bool whitelistEnabled;
    }

    uint256 public pollCount;
    mapping(uint256 => Poll) private polls;
    uint256[] private allPollIds;

    mapping(uint256 => mapping(address => bool)) public isAllowedVoter;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => address[]) private actualVoters;
    mapping(address => bool) public isAdmin;
    mapping(uint256 => mapping(address => bool)) public isAuditorForPoll;
    mapping(address => bool) public isOrganization;
    mapping(address => bool) public isAuditor;
    mapping(uint256 => address) public pollOrganization;
    mapping(address => uint256[]) private pollsByOrg;

    struct Ballot {
        uint256[] ranking;
    }
    mapping(uint256 => Ballot[]) private pollBallots;

    enum PollState {
        Created,
        Active,
        Ended,
        Finalized
    }

    enum VoteType {
        IRV,
        MAJORITY
    }

    constructor() {
        owner = msg.sender;
    }

    // -------------------------
    // MODIFIERS
    // -------------------------
    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyAdminOrOwner() {
        if (msg.sender != owner && !isAdmin[msg.sender]) revert AccessDenied();
        _;
    }

    modifier pollExists(uint256 pollId) {
        if (!polls[pollId].exists) revert PollDoesNotExist();
        _;
    }

    // -------------------------
    // STATE LOGIC
    // -------------------------

    function _updateState(uint256 pollId) internal view returns (PollState) {
        Poll memory p = polls[pollId];

        if (p.finalized) return PollState.Finalized;

        if (block.timestamp < p.startTime) return PollState.Created;

        if (block.timestamp >= p.startTime && block.timestamp < p.endTime) return PollState.Active;

        return PollState.Ended;
    }

    // -------------------------
    // CREATE POLL
    // -------------------------
    function createPoll(
        string memory _title,
        address[] memory _voters,
        string[] memory _candidates,
        address[] memory _auditors,
        VoteType _voteType,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _maxChoices
    ) external returns (uint256) {
        if (!isOrganization[msg.sender] && msg.sender != owner) revert AccessDenied();
        if (_maxChoices == 0 || _maxChoices > _candidates.length) revert InvalidMaxChoices();
        if (_candidates.length == 0) revert InvalidCandidates();
        if (_startTime >= _endTime) revert InvalidTime();

        uint256 pollId = pollCount++;
        Poll storage p = polls[pollId];

        pollOrganization[pollId] = msg.sender;
        pollsByOrg[msg.sender].push(pollId);
        allPollIds.push(pollId);

        p.title = _title;
        p.startTime = _startTime;
        p.endTime = _endTime;
        p.exists = true;
        p.voteType = _voteType;

        if (_voteType == VoteType.IRV) {
            p.maxChoices = _maxChoices;
        } else if (_voteType == VoteType.MAJORITY) {
            p.maxChoices = 1;
        }

        if (_voters.length > 0) {
            p.whitelistEnabled = true;
            _addVoters(pollId, _voters);
        }

        for (uint256 i = 0; i < _candidates.length; i++) {
            p.candidates.push(_candidates[i]);
        }

        for (uint256 i = 0; i < _auditors.length; i++) {
            if (!isAuditor[_auditors[i]]) revert AccessDenied();
            isAuditorForPoll[pollId][_auditors[i]] = true;
        }

        emit PollCreated(pollId, msg.sender, _title, _candidates, _startTime, _endTime);
        return pollId;
    }

    function _addVoters(uint256 pollId, address[] memory voters) internal {
        for (uint256 i = 0; i < voters.length; i++) {
            isAllowedVoter[pollId][voters[i]] = true;
        }
    }

    function addVotersToWhitelist(
        uint256 pollId,
        address[] calldata newVoters
    ) external pollExists(pollId) {
        if (msg.sender != pollOrganization[pollId]) revert AccessDenied();
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();
        Poll storage p = polls[pollId];
        p.whitelistEnabled = true;
        _addVoters(pollId, newVoters);
    }

    function deletePoll(uint256 pollId) external pollExists(pollId) {
        if (msg.sender != pollOrganization[pollId]) revert NotOrg();
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();

        uint256[] storage orgPolls = pollsByOrg[pollOrganization[pollId]];
        for (uint256 i = 0; i < orgPolls.length; i++) {
            if (orgPolls[i] == pollId) {
                orgPolls[i] = orgPolls[orgPolls.length - 1];
                orgPolls.pop();
                break;
            }
        }

        for (uint256 i = 0; i < allPollIds.length; i++) {
            if (allPollIds[i] == pollId) {
                allPollIds[i] = allPollIds[allPollIds.length - 1];
                allPollIds.pop();
                break;
            }
        }

        delete pollOrganization[pollId];
        delete polls[pollId];
    }

    function getAllPolls() external view returns (uint256[] memory) {
        return allPollIds;
    }

    function getPollsByOrg(address org) external view returns (uint256[] memory) {
        return pollsByOrg[org];
    }

    // -------------------------
    // ASSIGN ROLES
    // -------------------------

    function addAdmin(address user) external onlyOwner {
        isAdmin[user] = true;
        isAuditor[user] = false;
        isOrganization[user] = false;
    }

    function removeAdmin(address user) external onlyOwner {
        isAdmin[user] = false;
    }

    function addAuditor(address user) external onlyAdminOrOwner {
        isAuditor[user] = true;
        isAdmin[user] = false;
        isOrganization[user] = false;
    }

    function removeAuditor(address user) external onlyAdminOrOwner {
        isAuditor[user] = false;
    }

    function assignAuditorToPoll(
        uint256 pollId,
        address auditor
    ) external onlyAdminOrOwner pollExists(pollId) {
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();
        if (!isAuditor[auditor]) revert AccessDenied();

        isAuditorForPoll[pollId][auditor] = true;
    }

    function removeAuditorFromPoll(
        uint256 pollId,
        address auditor
    ) external onlyAdminOrOwner pollExists(pollId) {
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();
        isAuditorForPoll[pollId][auditor] = false;
    }

    function addOrganization(address user) external onlyAdminOrOwner {
        isOrganization[user] = true;
        isAdmin[user] = false;
        isAuditor[user] = false;
    }

    function removeOrganization(address user) external onlyAdminOrOwner {
        isOrganization[user] = false;
    }

    function getUserRole(address user) external view returns (string memory) {
        if (user == owner) return "Owner";
        if (isOrganization[user]) return "Organization";
        if (isAuditor[user]) return "Auditor";
        return "User";
    }

    // -------------------------
    // VALIDATE RANKING
    // -------------------------
    function _validateRanking(uint256[] calldata ranking, uint256 candidateCount) internal pure {
        if (ranking.length == 0 || ranking.length > candidateCount) revert InvalidRanking();

        bool[] memory seen = new bool[](candidateCount);

        for (uint256 i = 0; i < ranking.length; i++) {
            uint256 choice = ranking[i];

            if (choice >= candidateCount) revert InvalidRanking();
            if (seen[choice]) revert InvalidRanking();

            seen[choice] = true;
        }
    }

    // -------------------------
    // VOTE
    // -------------------------
    function vote(uint256 pollId, uint256[] calldata ranking) external pollExists(pollId) {
        Poll storage p = polls[pollId];

        if (_updateState(pollId) != PollState.Active) revert VotingIsActive();
        if (isAuditor[msg.sender] || msg.sender == pollOrganization[pollId]) revert AccessDenied();
        if (p.whitelistEnabled && !isAllowedVoter[pollId][msg.sender]) revert NotAllowedVoter();
        if (hasVoted[pollId][msg.sender]) revert AlreadyVoted();
        if (ranking.length > p.maxChoices) revert InvalidMaxChoices();

        _validateRanking(ranking, p.candidates.length);

        hasVoted[pollId][msg.sender] = true;
        actualVoters[pollId].push(msg.sender); //this is for auditing

        pollBallots[pollId].push(Ballot(ranking));

        emit VoteCast(pollId, msg.sender, block.timestamp);
    }

    // -------------------------
    // FINALIZE
    // -------------------------

    function finalizePoll(uint256 pollId) public pollExists(pollId) {
        if (msg.sender != owner && !isAdmin[msg.sender] && msg.sender != address(this)) {
            revert AccessDenied();
        }
        if (_updateState(pollId) != PollState.Ended) revert VotingNotEnded();
        Poll storage p = polls[pollId];
        if (p.finalized) revert PollAlreadyFinalized();

        uint256 totalBallots = pollBallots[pollId].length;
        if (totalBallots == 0) revert NoWinnerFound();

        uint256 winner;
        uint256 candidateCount = p.candidates.length;

        if (p.voteType == VoteType.MAJORITY) {
            // --- MAJORITY LOGIC ---
            uint256[] memory voteCount = new uint256[](candidateCount);

            for (uint256 i = 0; i < totalBallots; i++) {
                uint256[] memory ranking = pollBallots[pollId][i].ranking;
                if (ranking.length > 0) {
                    voteCount[ranking[0]]++;
                }
            }

            emit RoundTally(pollId, 1, voteCount);

            uint256 maxVotes = 0;
            uint256 tieCount = 0;
            uint256[] memory tied = new uint256[](candidateCount);

            for (uint256 i = 0; i < candidateCount; i++) {
                if (voteCount[i] > maxVotes) {
                    maxVotes = voteCount[i];
                    tied[0] = i;
                    tieCount = 1;
                } else if (voteCount[i] == maxVotes && maxVotes > 0) {
                    tied[tieCount] = i;
                    tieCount++;
                }
            }

            if (tieCount > 1) {
                uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, pollId)));
                winner = tied[seed % tieCount];
            } else {
                winner = tied[0];
            }
        } else {
            // --- IRV Logic ---
            bool[] memory eliminated = new bool[](candidateCount);
            uint256 remaining = candidateCount;
            uint256 roundIndex = 1;
            bool winnerFound = false;

            while (remaining > 1 && !winnerFound) {
                uint256[] memory voteCount = new uint256[](candidateCount);
                uint256 activeVotes = 0;

                for (uint256 i = 0; i < totalBallots; i++) {
                    uint256[] memory ranking = pollBallots[pollId][i].ranking;
                    for (uint256 j = 0; j < ranking.length; j++) {
                        uint256 choice = ranking[j];
                        if (!eliminated[choice]) {
                            voteCount[choice]++;
                            activeVotes++;
                            break;
                        }
                    }
                }

                emit RoundTally(pollId, roundIndex, voteCount);

                for (uint256 i = 0; i < candidateCount; i++) {
                    if (!eliminated[i] && activeVotes > 0 && voteCount[i] * 2 > activeVotes) {
                        winner = i;
                        winnerFound = true;
                        break;
                    }
                }

                if (!winnerFound) {
                    uint256 minVotes = type(uint256).max;
                    uint256 tieCount = 0;
                    uint256[] memory tiedForMin = new uint256[](candidateCount);

                    for (uint256 i = 0; i < candidateCount; i++) {
                        if (!eliminated[i]) {
                            if (voteCount[i] < minVotes) {
                                minVotes = voteCount[i];
                                tiedForMin[0] = i;
                                tieCount = 1;
                            } else if (voteCount[i] == minVotes) {
                                tiedForMin[tieCount] = i;
                                tieCount++;
                            }
                        }
                    }

                    uint256 toElim;
                    if (tieCount > 1) {
                        uint256 seed = uint256(
                            keccak256(abi.encodePacked(block.timestamp, pollId, roundIndex))
                        );
                        toElim = tiedForMin[seed % tieCount];
                    } else {
                        toElim = tiedForMin[0];
                    }

                    eliminated[toElim] = true;
                    remaining--;
                    roundIndex++;
                }
            }

            if (!winnerFound) {
                for (uint256 i = 0; i < candidateCount; i++) {
                    if (!eliminated[i]) {
                        winner = i;
                        break;
                    }
                }
            }
        }

        p.winnerIndex = winner;
        p.finalized = true;
        emit PollFinalized(pollId, winner);
    }

    // -------------------------
    // CHAINLINK AUTOMATION
    // -------------------------

    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        for (uint256 i = 0; i < pollCount; i++) {
            Poll storage p = polls[i];

            if (p.exists && !p.finalized && block.timestamp >= p.endTime) {
                return (true, abi.encode(i));
            }
        }
        return (false, "");
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 pollId = abi.decode(performData, (uint256));

        Poll storage p = polls[pollId];
        if (p.exists && !p.finalized && block.timestamp >= p.endTime) {
            // We call your existing finalize logic
            // NOTE: Since finalizePoll has onlyAdminOrOwner, you should //??
            // either remove that modifier or allow this contract to call itself.
            this.finalizePoll(pollId);
        }
    }

    function getPollDetails(
        uint256 pollId
    )
        external
        view
        pollExists(pollId)
        returns (
            string memory title,
            uint256 startTime,
            uint256 endTime,
            uint256 candidateCount,
            uint256 maxChoices,
            string[] memory candidateNames,
            address creator,
            VoteType voteType,
            PollState currentState
        )
    {
        Poll storage p = polls[pollId];
        string[] memory names = new string[](p.candidates.length);
        for (uint256 i = 0; i < p.candidates.length; i++) {
            names[i] = p.candidates[i];
        }
        return (
            p.title,
            p.startTime,
            p.endTime,
            p.candidates.length,
            p.maxChoices,
            names,
            pollOrganization[pollId],
            p.voteType,
            _updateState(pollId)
        );
    }

    function hasUserVoted(
        uint256 pollId,
        address user
    ) external view pollExists(pollId) returns (bool) {
        return hasVoted[pollId][user];
    }

    // -------------------------
    // GET WINNER
    // -------------------------
    function computeWinner(uint256 pollId) public view pollExists(pollId) returns (uint256) {
        Poll storage p = polls[pollId];
        if (!p.finalized) revert VotingNotEnded();
        return p.winnerIndex;
    }

    // -------------------------
    // GET ALL VOTES (AUDITOR OR OWNER OR PUBLIC)
    // -------------------------

    function getVotes(
        uint256 pollId
    ) external view pollExists(pollId) returns (uint256[][] memory) {
        if (_updateState(pollId) != PollState.Ended && _updateState(pollId) != PollState.Finalized)
            revert VotingNotEnded();

        if (msg.sender != owner && !isAuditorForPoll[pollId][msg.sender]) {
            revert AccessDenied();
        }

        uint256 ballotCount = pollBallots[pollId].length;
        uint256[][] memory allRankings = new uint256[][](ballotCount);

        for (uint256 i = 0; i < ballotCount; i++) {
            allRankings[i] = pollBallots[pollId][i].ranking;
        }
        return allRankings;
    }

    // -------------------------
    // AUDITOR CHECK
    // -------------------------
    function isPollAuditor(uint256 pollId, address user) external view returns (bool) {
        return isAuditorForPoll[pollId][user];
    }
}
