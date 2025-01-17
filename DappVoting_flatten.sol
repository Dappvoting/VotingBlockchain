// Sources flattened with hardhat v2.22.3 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/utils/Counters.sol@v4.4.2

// OpenZeppelin Contracts v4.4.1 (utils/Counters.sol)

pragma solidity ^0.8.0;

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 */
library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}


// File contracts/DappVotes.sol


pragma solidity ^0.8.0;
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
    address director;
    uint startsAt;
    uint endsAt;
    uint timestamp;
    address[] voters;
    string[] avatars;
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

  event Voted(address indexed voter, uint timestamp);

  function createPoll(
    string memory image,
    string memory title,
    string memory description,
    uint startsAt,
    uint endsAt
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
    poll.director = msg.sender;
    poll.timestamp = currentTime();

    polls[poll.id] = poll;
    pollExist[poll.id] = true;
  }

  function updatePoll(
    uint id,
    string memory image,
    string memory title,
    string memory description,
    uint startsAt,
    uint endsAt
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
  }

  function deletePoll(uint id) public {
    require(pollExist[id], 'Poll not found');
    require(polls[id].director == msg.sender, 'Unauthorized entity');
    require(polls[id].votes < 1, 'Poll has votes already');
    polls[id].deleted = true;
  }

  function getPoll(uint id) public view returns (PollStruct memory) {
    return polls[id];
  }

  function getPolls() public view returns (PollStruct[] memory Polls) {
    uint available;
    for (uint i = 1; i <= totalPolls.current(); i++) {
        if(!polls[i].deleted) available++;
    }

    Polls = new PollStruct[](available);
    uint index;

    for (uint i = 1; i <= totalPolls.current(); i++) {
        if(!polls[i].deleted) {
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
  }

  function getContestant(uint id, uint cid) public view returns (ContestantStruct memory) {
    return contestants[id][cid];
  }

  function getContestants(uint id) public view returns (ContestantStruct[] memory Contestants) {
    uint available;
    for (uint i = 1; i <= totalContestants.current(); i++) {
        if(contestants[id][i].id == i) available++;
    }

    Contestants = new ContestantStruct[](available);
    uint index;

    for (uint i = 1; i <= totalContestants.current(); i++) {
        if(contestants[id][i].id == i) {
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

    polls[id].votes++;
    polls[id].voters.push(msg.sender);

    contestants[id][cid].votes++;
    contestants[id][cid].voters.push(msg.sender);
    voted[id][msg.sender] = true;

    emit Voted(msg.sender, currentTime());
  }

  function currentTime() internal view returns (uint256) {
    return (block.timestamp * 1000) + 1000;
  }
}
