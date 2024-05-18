import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuthorizedVotersAdded,
  ContestantAdded,
  PollCreated,
  PollDeleted,
  PollUpdated,
  Voted
} from "../generated/VotingDapp/VotingDapp"

export function createAuthorizedVotersAddedEvent(
  pollId: BigInt,
  voters: Array<Address>
): AuthorizedVotersAdded {
  let authorizedVotersAddedEvent = changetype<AuthorizedVotersAdded>(
    newMockEvent()
  )

  authorizedVotersAddedEvent.parameters = new Array()

  authorizedVotersAddedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )
  authorizedVotersAddedEvent.parameters.push(
    new ethereum.EventParam("voters", ethereum.Value.fromAddressArray(voters))
  )

  return authorizedVotersAddedEvent
}

export function createContestantAddedEvent(
  pollId: BigInt,
  contestantId: BigInt,
  name: string,
  image: string,
  voter: Address
): ContestantAdded {
  let contestantAddedEvent = changetype<ContestantAdded>(newMockEvent())

  contestantAddedEvent.parameters = new Array()

  contestantAddedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )
  contestantAddedEvent.parameters.push(
    new ethereum.EventParam(
      "contestantId",
      ethereum.Value.fromUnsignedBigInt(contestantId)
    )
  )
  contestantAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  contestantAddedEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromString(image))
  )
  contestantAddedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return contestantAddedEvent
}

export function createPollCreatedEvent(
  id: BigInt,
  title: string,
  description: string,
  director: Address,
  startsAt: BigInt,
  endsAt: BigInt,
  isPublic: boolean
): PollCreated {
  let pollCreatedEvent = changetype<PollCreated>(newMockEvent())

  pollCreatedEvent.parameters = new Array()

  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("director", ethereum.Value.fromAddress(director))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startsAt",
      ethereum.Value.fromUnsignedBigInt(startsAt)
    )
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("endsAt", ethereum.Value.fromUnsignedBigInt(endsAt))
  )
  pollCreatedEvent.parameters.push(
    new ethereum.EventParam("isPublic", ethereum.Value.fromBoolean(isPublic))
  )

  return pollCreatedEvent
}

export function createPollDeletedEvent(id: BigInt): PollDeleted {
  let pollDeletedEvent = changetype<PollDeleted>(newMockEvent())

  pollDeletedEvent.parameters = new Array()

  pollDeletedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return pollDeletedEvent
}

export function createPollUpdatedEvent(
  id: BigInt,
  title: string,
  description: string,
  startsAt: BigInt,
  endsAt: BigInt,
  isPublic: boolean
): PollUpdated {
  let pollUpdatedEvent = changetype<PollUpdated>(newMockEvent())

  pollUpdatedEvent.parameters = new Array()

  pollUpdatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  pollUpdatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  pollUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  pollUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "startsAt",
      ethereum.Value.fromUnsignedBigInt(startsAt)
    )
  )
  pollUpdatedEvent.parameters.push(
    new ethereum.EventParam("endsAt", ethereum.Value.fromUnsignedBigInt(endsAt))
  )
  pollUpdatedEvent.parameters.push(
    new ethereum.EventParam("isPublic", ethereum.Value.fromBoolean(isPublic))
  )

  return pollUpdatedEvent
}

export function createVotedEvent(
  voter: Address,
  pollId: BigInt,
  contestantId: BigInt,
  timestamp: BigInt
): Voted {
  let votedEvent = changetype<Voted>(newMockEvent())

  votedEvent.parameters = new Array()

  votedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  votedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "contestantId",
      ethereum.Value.fromUnsignedBigInt(contestantId)
    )
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return votedEvent
}
