// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract DappVotes {
  using Counters for Counters.Counter;
  Counters.Counter private totalPolls;
  Counters.Counter private totalContestants;

  struct PollStruct {
    uint id;
    string image;
    string title;
    string description;
    uint votes;
    uint contestants;
    bool deleted;
    bool isPublic;
    address director;
    uint startsAt;
    uint endsAt;
    uint timestamp;
    address[] voters;
    string[] avatars;
    address[] authorizedVoters;
  }

  struct ContestantStruct {
    uint id;
    string image;
    string name;
    address voter;
    uint votes;
    address[] voters;
  }

  mapping(uint => bool) pollExist;
  mapping(uint => PollStruct) polls;
  mapping(uint => mapping(address => bool)) voted;
  mapping(uint => mapping(address => bool)) contested;
  mapping(uint => mapping(uint => ContestantStruct)) contestants;

  event PollCreated(uint id, string title, string description, address director, uint startsAt, uint endsAt, bool isPublic);
  event PollUpdated(uint id, string title, string description, uint startsAt, uint endsAt, bool isPublic);
  event PollDeleted(uint id);
  event ContestantAdded(uint pollId, uint contestantId, string name, string image, address voter);
  event Voted(address indexed voter, uint pollId, uint contestantId, uint timestamp);
  event AuthorizedVotersAdded(uint pollId, address[] voters);

  function createPoll(
    string memory image,
    string memory title,
    string memory description,
    uint startsAt,
    uint endsAt,
    bool isPublic
  ) public {
    require(bytes(title).length > 0, 'Title cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(image).length > 0, 'Image URL cannot be empty');
    require(startsAt > 0, 'Start date must be greater than 0');
    require(endsAt > startsAt, 'End date must be greater than start date');

    totalPolls.increment();

    PollStruct memory poll;
    poll.id = totalPolls.current();
    poll.title = title;
    poll.description = description;
    poll.image = image;
    poll.startsAt = startsAt;
    poll.endsAt = endsAt;
    poll.isPublic = isPublic;
    poll.director = msg.sender;
    poll.timestamp = currentTime();

    polls[poll.id] = poll;
    pollExist[poll.id] = true;

    emit PollCreated(poll.id, title, description, msg.sender, startsAt, endsAt, isPublic);
  }

  function updatePoll(
    uint id,
    string memory image,
    string memory title,
    string memory description,
    uint startsAt,
    uint endsAt,
    bool isPublic
  ) public {
    require(pollExist[id], 'Poll not found');
    require(polls[id].director == msg.sender, 'Unauthorized entity');
    require(bytes(title).length > 0, 'Title cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(image).length > 0, 'Image URL cannot be empty');
    require(!polls[id].deleted, 'Polling already deleted');
    require(polls[id].votes < 1, 'Poll has votes already');
    require(endsAt > startsAt, 'End date must be greater than start date');

    polls[id].title = title;
    polls[id].description = description;
    polls[id].startsAt = startsAt;
    polls[id].endsAt = endsAt;
    polls[id].image = image;
    polls[id].isPublic = isPublic;

    emit PollUpdated(id, title, description, startsAt, endsAt, isPublic);
  }

  function deletePoll(uint id) public {
    require(pollExist[id], 'Poll not found');
    require(polls[id].director == msg.sender, 'Unauthorized entity');
    require(polls[id].votes < 1, 'Poll has votes already');
    polls[id].deleted = true;

    emit PollDeleted(id);
  }

  function getPoll(uint id) public view returns (PollStruct memory) {
    return polls[id];
  }

  function getPolls() public view returns (PollStruct[] memory Polls) {
    uint available;
    for (uint i = 1; i <= totalPolls.current(); i++) {
      if (!polls[i].deleted) available++;
    }

    Polls = new PollStruct[](available);
    uint index;

    for (uint i = 1; i <= totalPolls.current(); i++) {
      if (!polls[i].deleted) {
        Polls[index++] = polls[i];
      }
    }
  }

  function contest(uint id, string memory name, string memory image) public {
    require(pollExist[id], 'Poll not found');
    require(bytes(name).length > 0, 'name cannot be empty');
    require(bytes(image).length > 0, 'image cannot be empty');
    require(polls[id].votes < 1, 'Poll has votes already');
    require(!contested[id][msg.sender], 'Already contested');

    totalContestants.increment();

    ContestantStruct memory contestant;
    contestant.name = name;
    contestant.image = image;
    contestant.voter = msg.sender;
    contestant.id = totalContestants.current();

    contestants[id][contestant.id] = contestant;
    contested[id][msg.sender] = true;
    polls[id].avatars.push(image);
    polls[id].contestants++;

    emit ContestantAdded(id, contestant.id, name, image, msg.sender);
  }

  function getContestant(uint id, uint cid) public view returns (ContestantStruct memory) {
    return contestants[id][cid];
  }

  function getContestants(uint id) public view returns (ContestantStruct[] memory Contestants) {
    uint available;
    for (uint i = 1; i <= totalContestants.current(); i++) {
      if (contestants[id][i].id == i) available++;
    }

    Contestants = new ContestantStruct[](available);
    uint index;

    for (uint i = 1; i <= totalContestants.current(); i++) {
      if (contestants[id][i].id == i) {
        Contestants[index++] = contestants[id][i];
      }
    }
  }

  function vote(uint id, uint cid) public {
    require(pollExist[id], 'Poll not found');
    require(!voted[id][msg.sender], 'Already voted');
    require(!polls[id].deleted, 'Polling not available');
    require(polls[id].contestants > 1, 'Not enough contestants');
    require(
      currentTime() >= polls[id].startsAt && currentTime() < polls[id].endsAt,
      'Voting must be in session'
    );

    if (!polls[id].isPublic) {
      require(isAuthorizedVoter(id, msg.sender), 'Not authorized to vote in this poll');
    }

    polls[id].votes++;
    polls[id].voters.push(msg.sender);

    contestants[id][cid].votes++;
    contestants[id][cid].voters.push(msg.sender);
    voted[id][msg.sender] = true;

    emit Voted(msg.sender, id, cid, currentTime());
  }

  function addAuthorizedVoters(uint id, address[] memory voters) public {
    require(pollExist[id], 'Poll not found');
    require(polls[id].director == msg.sender, 'Unauthorized entity');
    require(!polls[id].deleted, 'Polling already deleted');
    require(polls[id].votes < 1, 'Poll has votes already');
    require(!polls[id].isPublic, 'Cannot add authorized voters to a public poll');

    for (uint i = 0; i < voters.length; i++) {
      polls[id].authorizedVoters.push(voters[i]);
    }

    emit AuthorizedVotersAdded(id, voters);
  }

  function isAuthorizedVoter(uint pollId, address voter) internal view returns (bool) {
    for (uint i = 0; i < polls[pollId].authorizedVoters.length; i++) {
      if (polls[pollId].authorizedVoters[i] == voter) {
        return true;
      }
    }
    return false;
  }

  function currentTime() internal view returns (uint256) {
    return block.timestamp;
  }
}
