import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Voted } from "../generated/DappVotes/DappVotes"

export function createVotedEvent(voter: Address, timestamp: BigInt): Voted {
  let votedEvent = changetype<Voted>(newMockEvent())

  votedEvent.parameters = new Array()

  votedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  votedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return votedEvent
}
