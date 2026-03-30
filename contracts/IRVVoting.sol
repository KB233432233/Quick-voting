// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IRVVoting {
    // -------------------------
    // ERRORS
    // -------------------------
    error AlreadyVoted();
    error NotAllowedVoter();
    error PollDoesNotExist();
    error VotingNotStarted();
    error VotingEnded();
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

    // -------------------------
    // EVENTS
    // -------------------------
    event PollCreated(
        uint256 indexed pollId,
        address indexed admin,
        string title,
        uint256 startTime,
        uint256 endTime
    );
    event VoteCast(
        uint256 indexed pollId,
        address indexed voter,
        uint256[] ranking,
        uint256 timestamp
    );
    event PollFinalized(uint256 indexed pollId, uint256 winnerIndex);

    // -------------------------
    // STORAGE
    // -------------------------
    address public owner;

    struct Candidate {
        string name;
        string image;
        string description;
    }

    struct Poll {
        string title;
        uint256 startTime;
        uint256 endTime;
        bool exists;
        bool publicViewable;
        bool finalized;
        uint256 winnerIndex;
        Candidate[] candidates;
        address[] voters;
    }

    uint256 public pollCount;
    mapping(uint256 => Poll) private polls;
    uint256[] private allPollIds;

    mapping(uint256 => mapping(address => bool)) public isAllowedVoter;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(address => uint256[])) private votes;
    mapping(uint256 => address[]) private actualVoters;
    mapping(uint256 => mapping(address => bool)) public isAuditorForPoll;
    mapping(address => bool) public isOrganization;
    mapping(address => bool) public isAuditor;
    mapping(uint256 => address) public pollOrganization;
    mapping(address => uint256[]) private pollsByOrg;

    enum PollState {
        Created,
        Active,
        Ended,
        Finalized
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

    modifier pollExists(uint256 pollId) {
        if (!polls[pollId].exists) revert PollDoesNotExist();
        _;
    }

    // -------------------------
    // STATE LOGIC
    // -------------------------

    function _updateState(uint256 pollId) internal view returns (PollState) {
        Poll storage p = polls[pollId];

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
        string[] memory _names,
        string[] memory _images,
        string[] memory _descriptions,
        address[] memory _auditors,
        uint256 _startTime,
        uint256 _endTime,
        bool _publicViewable
    ) external returns (uint256) {
        if (!isOrganization[msg.sender] && msg.sender != owner) revert AccessDenied();
        if (_names.length == 0) revert InvalidCandidates();

        if (_names.length != _images.length || _names.length != _descriptions.length)
            revert InvalidCandidates();

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
        p.publicViewable = _publicViewable;
        p.voters = _voters;

        for (uint256 i = 0; i < _voters.length; i++) {
            isAllowedVoter[pollId][_voters[i]] = true;
        }

        for (uint256 i = 0; i < _names.length; i++) {
            p.candidates.push(Candidate(_names[i], _images[i], _descriptions[i]));
        }

        for (uint256 i = 0; i < _auditors.length; i++) {
            if (!isAuditor[_auditors[i]]) revert AccessDenied();
            isAuditorForPoll[pollId][_auditors[i]] = true;
        }

        emit PollCreated(pollId, msg.sender, _title, _startTime, _endTime);
        return pollId;
    }

    function deletePoll(uint256 pollId) external pollExists(pollId) {
        if (msg.sender != pollOrganization[pollId]) revert NotOrg();
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();

        // remove from org list
        uint256[] storage orgPolls = pollsByOrg[pollOrganization[pollId]];
        for (uint256 i = 0; i < orgPolls.length; i++) {
            if (orgPolls[i] == pollId) {
                orgPolls[i] = orgPolls[orgPolls.length - 1];
                orgPolls.pop();
                break;
            }
        }

        // remove from global list
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
    // ADD AUDITOR (ONLY BEFORE START)
    // -------------------------

    function addAuditor(address user) external onlyOwner {
        isAuditor[user] = true;
    }

    function removeAuditor(address user) external onlyOwner {
        isAuditor[user] = false;
    }

    function assignAuditorToPoll(
        uint256 pollId,
        address auditor
    ) external onlyOwner pollExists(pollId) {
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();
        if (!isAuditor[auditor]) revert AccessDenied(); // 🔥 important

        isAuditorForPoll[pollId][auditor] = true;
    }

    function removeAuditorFromPoll(
        uint256 pollId,
        address auditor
    ) external onlyOwner pollExists(pollId) {
        if (_updateState(pollId) != PollState.Created) revert AccessDenied();
        isAuditorForPoll[pollId][auditor] = false;
    }

    function addOrganization(address user) external onlyOwner {
        isOrganization[user] = true;
    }

    function removeOrganization(address user) external onlyOwner {
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

        if (_updateState(pollId) != PollState.Active) revert VotingEnded();
        if (isAuditor[msg.sender]) revert AccessDenied();
        if (p.voters.length > 0 && !isAllowedVoter[pollId][msg.sender]) revert NotAllowedVoter();
        if (hasVoted[pollId][msg.sender]) revert AlreadyVoted();

        _validateRanking(ranking, p.candidates.length);

        hasVoted[pollId][msg.sender] = true;
        votes[pollId][msg.sender] = ranking;
        actualVoters[pollId].push(msg.sender);

        emit VoteCast(pollId, msg.sender, ranking, block.timestamp);
    }

    // -------------------------
    // IRV WINNER LOGIC
    // -------------------------

    function _computeWinnerInternal(uint256 pollId) internal view returns (uint256) {
        Poll storage p = polls[pollId];

        uint256 candidateCount = p.candidates.length;
        bool[] memory eliminated = new bool[](candidateCount);
        uint256 remaining = candidateCount;

        address[] storage participants = actualVoters[pollId];

        if (participants.length == 0) revert NoWinnerFound();

        while (remaining > 1) {
            uint256[] memory voteCount = new uint256[](candidateCount);
            uint256 activeVotes = 0;

            // 1. Count current top-choice votes for non-eliminated candidates
            for (uint256 i = 0; i < participants.length; i++) {
                uint256[] memory ranking = votes[pollId][participants[i]];

                for (uint256 j = 0; j < ranking.length; j++) {
                    uint256 choice = ranking[j];

                    if (!eliminated[choice]) {
                        voteCount[choice]++;
                        activeVotes++;
                        break;
                    }
                }
            }

            // 2. Check if anyone has a majority ( > 50%)
            for (uint256 i = 0; i < candidateCount; i++) {
                if (!eliminated[i] && activeVotes > 0) {
                    if (voteCount[i] * 2 > activeVotes) return i;
                }
            }

            // 3. Find the minimum votes and handle ties for elimination
            uint256 minVotes = type(uint256).max;
            uint256[] memory tiedForMin = new uint256[](candidateCount);
            uint256 tieCount = 0;

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

            // 4. Eliminate one candidate (Randomly if tied)
            uint256 indexToEliminate;
            if (tieCount > 1) {
                // Use block data and pollId to create a pseudo-random seed
                uint256 seed = uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.prevrandao, pollId, remaining)
                    )
                );
                indexToEliminate = tiedForMin[seed % tieCount];
            } else {
                indexToEliminate = tiedForMin[0];
            }

            eliminated[indexToEliminate] = true;
            remaining--;
        }

        // 5. If loop finishes, find the last one standing
        for (uint256 i = 0; i < candidateCount; i++) {
            if (!eliminated[i]) return i;
        }

        revert NoWinnerFound();
    }

    // -------------------------
    // FINALIZE
    // -------------------------
    function finalizePoll(uint256 pollId) external onlyOwner pollExists(pollId) {
        if (_updateState(pollId) != PollState.Ended) revert VotingNotEnded();

        Poll storage p = polls[pollId];
        if (p.finalized) revert PollAlreadyFinalized();

        uint256 winner = _computeWinnerInternal(pollId);

        p.winnerIndex = winner;
        p.finalized = true;

        emit PollFinalized(pollId, winner);
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
            bool publicViewable,
            PollState currentState
        )
    {
        Poll storage p = polls[pollId];
        return (
            p.title,
            p.startTime,
            p.endTime,
            p.candidates.length,
            p.publicViewable,
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

        if (p.finalized) return p.winnerIndex;
        if (_updateState(pollId) != PollState.Ended) revert VotingNotEnded();

        return _computeWinnerInternal(pollId);
    }

    // -------------------------
    // GET MY VOTE
    // -------------------------
    function getMyVote(uint256 pollId) external view pollExists(pollId) returns (uint256[] memory) {
        if (!hasVoted[pollId][msg.sender]) revert NoVoteFound();
        return votes[pollId][msg.sender];
    }

    // -------------------------
    // GET ALL VOTES (AUDITOR OR OWNER OR PUBLIC)
    // -------------------------
    function getVotes(
        uint256 pollId
    ) external view pollExists(pollId) returns (address[] memory, uint256[][] memory) {
        Poll storage p = polls[pollId];
        PollState state = _updateState(pollId);

        if (state != PollState.Ended) revert VotingNotEnded();
        if (!p.publicViewable && msg.sender != owner && !isAuditorForPoll[pollId][msg.sender]) {
            revert AccessDenied();
        }

        address[] memory users = actualVoters[pollId];
        uint256[][] memory allRankings = new uint256[][](users.length);

        for (uint256 i = 0; i < users.length; i++) {
            allRankings[i] = votes[pollId][users[i]];
        }

        return (users, allRankings);
    }

    // -------------------------
    // AUDITOR CHECK
    // -------------------------
    function isPollAuditor(uint256 pollId, address user) external view returns (bool) {
        return isAuditorForPoll[pollId][user];
    }
}
