import { browserHistory } from 'react-router'
import createGithubInstance, { getErrorMessage } from '../../../utils/createGithubInstance'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_REPOS = 'LOAD_REPOS'
export const LOAD_REPOS_RESOLVE = 'LOAD_REPOS_RESOLVE'
export const LOAD_REPOS_REJECT = 'LOAD_REPOS_REJECT'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export const loadRepos = () => {
  return (dispatch, getState) => {
    const server = createGithubInstance()
    const reposUrl = getState().home.reposUrl

    if (!reposUrl) {
      browserHistory.push('/');
      return;
    }

    server.get(reposUrl).then(function(response) {
      console.log('repos', response)
      dispatch(loadReposResolve(response.data))

    }).catch(function (error) {
      console.log(error);
      dispatch(
          loadReposReject(getErrorMessage(error))
      )
    });
  }
}

export const loadReposResolve = (repos) => {
  return {
    type: LOAD_REPOS_RESOLVE,
    repos: repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      issuesUrl: repo.issues_url,
      openIssues: repo.open_issues,
    }))
  }
}

export const loadReposReject = (message) => {
  return {
    type: LOAD_REPOS_REJECT,
    message: message
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // TODO show spinner
  [LOAD_REPOS]    : (state, action) => state ,
  [LOAD_REPOS_RESOLVE]    : (state, action) => ({
      ...state,
      repos: action.repos
  }) ,
  // TODO show error message
  [LOAD_REPOS_REJECT]    : (state, action) => state ,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function reposReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
