import { Voted as VotedEvent } from "../generated/DappVotes/DappVotes"
import { Voted } from "../generated/schema"

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
