import {
  AuthorizedVotersAdded as AuthorizedVotersAddedEvent,
  ContestantAdded as ContestantAddedEvent,
  PollCreated as PollCreatedEvent,
  PollDeleted as PollDeletedEvent,
  PollUpdated as PollUpdatedEvent,
  Voted as VotedEvent
} from "../generated/VotingDapp/VotingDapp"
import {
  AuthorizedVotersAdded,
  ContestantAdded,
  PollCreated,
  PollDeleted,
  PollUpdated,
  Voted
} from "../generated/schema"

export function handleAuthorizedVotersAdded(
  event: AuthorizedVotersAddedEvent
): void {
  let entity = new AuthorizedVotersAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId
  entity.voters = event.params.voters

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContestantAdded(event: ContestantAddedEvent): void {
  let entity = new ContestantAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId
  entity.contestantId = event.params.contestantId
  entity.name = event.params.name
  entity.image = event.params.image
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollCreated(event: PollCreatedEvent): void {
  let entity = new PollCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.VotingDapp_id = event.params.id
  entity.title = event.params.title
  entity.description = event.params.description
  entity.director = event.params.director
  entity.startsAt = event.params.startsAt
  entity.endsAt = event.params.endsAt
  entity.isPublic = event.params.isPublic

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollDeleted(event: PollDeletedEvent): void {
  let entity = new PollDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.VotingDapp_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollUpdated(event: PollUpdatedEvent): void {
  let entity = new PollUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.VotingDapp_id = event.params.id
  entity.title = event.params.title
  entity.description = event.params.description
  entity.startsAt = event.params.startsAt
  entity.endsAt = event.params.endsAt
  entity.isPublic = event.params.isPublic

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.pollId = event.params.pollId
  entity.contestantId = event.params.contestantId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
