// apollo.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const apolloClient = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/74144/votingsubgraph/v0.0.4', // Thay thế bằng URL subgraph của bạn
  cache: new InMemoryCache()
});

provideApolloClient(apolloClient);
export default apolloClient;

// Get authorized Vote
export const authorizedVotersAddedQuery = () => {
  const queryString = `
  query {
    authorizedVotersAddeds {
      id
      pollId
      voters
      blockNumber
      blockTimestamp
      transactionHash
  }`;
  return gql(queryString);
};

const getAuthorizedVotersAddedQuery = async (apolloClient) => {
  try {
    const result = await apolloClient.query({
      query: authorizedVotersAddedQuery(),
      fetchPolicy: "no-cache"
    });
    return result?.data;
  } catch (e) {
    console.log(e);
  }
};

// Get poll created
export const pollCreatedsQuery = () => {
  const queryString = `
  query {
    pollCreateds {
      transactionHash
      title
      startsAt
      isPublic
      image
      id
      endsAt
      director
      description
      blockTimestamp
      blockNumber
      Contract_id
    }
  }`;
  return gql(queryString);
};

const getPollCreatedsQuery = async (apolloClient) => {
  try {
    const result = await apolloClient.query({
      query: pollCreatedsQuery(),
      fetchPolicy: "no-cache"
    });
    return result?.data;
  } catch (e) {
    console.log(e);
  }
};

// Get Contestant Added
export const contestantAddedsQuery = () => {
  const queryString = `
  query {
    contestantAddeds {
      blockNumber
      blockTimestamp
      contestantId
      id
      image
      name
      pollId
      transactionHash
      voter
    }
  }`;
  return gql(queryString);
};

const getPollContestantAddedsQuery = async (apolloClient) => {
  try {
    const result = await apolloClient.query({
      query: contestantAddedsQuery(),
      fetchPolicy: "no-cache"
    });
    return result?.data;
  } catch (e) {
    console.log(e);
  }
};

// get poll Deleted
export const pollDeletedsQuery = () => {
  const queryString = `
  query {
    pollDeleteds {
      Contract_id
      blockNumber
      blockTimestamp
      id
      transactionHash
    }
  }`;
  return gql(queryString);
};

const getPollDeletedsQuery = async (apolloClient) => {
  try {
    const result = await apolloClient.query({
      query: pollDeletedsQuery(),
      fetchPolicy: "no-cache"
    });
    return result?.data;
  } catch (e) {
    console.log(e);
  }
};

// get poll updated
export const pollUpdatedsQuery = () => {
  const queryString = `
  query {
    pollUpdateds {
      Contract_id
      blockNumber
      blockTimestamp
      description
      endsAt
      id
      isPublic
      startsAt
      title
      transactionHash
    }
  }`;
  return gql(queryString);
};

const getPollUpdatedsQuery = async (apolloClient) => {
  try {
    const result = await apolloClient.query({
      query: pollUpdatedsQuery(),
      fetchPolicy: "no-cache"
    });
    return result?.data;
  } catch (e) {
    console.log(e);
  }
};

// get voted
export const votedsQuery = () => {
  const queryString = `
  query {
    voteds {
      blockNumber
      blockTimestamp
      contestantId
      id
      pollId
      timestamp
    }
  }`;
  return gql(queryString);
};

const getVotedsQuery = async (apolloClient) => {
  try {
    const result = await apolloClient.query({
      query: votedsQuery(),
      fetchPolicy: "no-cache"
    });
    return result?.data;
  } catch (e) {
    console.log(e);
  }
};

export function loadAllPollTest(dispatch) {
  async function getAuthorizedVotersAddedQueryData() {
    const data = await getAuthorizedVotersAddedQuery(apolloClient);
    const authorizedVotersAdded = data.authorizedVotersAddeds;
    dispatch({ type: 'AuthorizedVotersAdded_LOADED', authorizedVotersAdded });
  }

  async function getPollCreatedsQueryData() {
    const data = await getPollCreatedsQuery(apolloClient);
    const pollCreateds = data.pollCreateds;
    dispatch({ type: 'POLL_CREATED_LOADED', pollCreateds });
  }

  async function getPollContestantAddedsQueryData() {
    const data = await getPollContestantAddedsQuery(apolloClient);
    const contestantAddeds = data.contestantAddeds;
    dispatch({ type: 'POLL_CONTESTANTADDEDS_LOADED', contestantAddeds });
  }

  async function getPollDeletedsQueryData() {
    const data = await getPollDeletedsQuery(apolloClient);
    const pollDeleteds = data.pollDeleteds;
    dispatch({ type: 'POLL_DELETEDS_LOADED', pollDeleteds });
  }

  async function getPollUpdatedsQueryData() {
    const data = await getPollUpdatedsQuery(apolloClient);
    const pollUpdateds = data.pollUpdateds;
    dispatch({ type: 'POLL_UPDATEDS_LOADED', pollUpdateds });
  }

  async function getVotedsQueryData() {
    const data = await getVotedsQuery(apolloClient);
    const voteds = data.voteds;
    dispatch({ type: 'VOTED_LOADED', voteds });
  }

  getAuthorizedVotersAddedQueryData();
  getPollCreatedsQueryData();
  getPollContestantAddedsQueryData();
  getPollDeletedsQueryData();
  getPollUpdatedsQueryData();
  getVotedsQueryData();
}
