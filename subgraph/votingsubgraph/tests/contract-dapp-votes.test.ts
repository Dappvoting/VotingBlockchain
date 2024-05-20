import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AuthorizedVotersAdded } from "../generated/schema"
import { AuthorizedVotersAdded as AuthorizedVotersAddedEvent } from "../generated/ContractDappVotes/ContractDappVotes"
import { handleAuthorizedVotersAdded } from "../src/contract-dapp-votes"
import { createAuthorizedVotersAddedEvent } from "./contract-dapp-votes-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let pollId = BigInt.fromI32(234)
    let voters = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let newAuthorizedVotersAddedEvent = createAuthorizedVotersAddedEvent(
      pollId,
      voters
    )
    handleAuthorizedVotersAdded(newAuthorizedVotersAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuthorizedVotersAdded created and stored", () => {
    assert.entityCount("AuthorizedVotersAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuthorizedVotersAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pollId",
      "234"
    )
    assert.fieldEquals(
      "AuthorizedVotersAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "voters",
      "[0x0000000000000000000000000000000000000001]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
