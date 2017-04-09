import createGithubInstance, { getErrorMessage } from '../../../utils/createGithubInstance'
import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const SUBMIT_TOKEN = 'SUBMIT_TOKEN'
export const SUBMIT_TOKEN_RESOLVE = 'SUBMIT_TOKEN_RESOLVE'
export const SUBMIT_TOKEN_REJECT = 'SUBMIT_TOKEN_REJECT'

// ------------------------------------
// Actions
// ------------------------------------
export function submitToken (token) {
  return (dispatch) => {
    const server = createGithubInstance(token)

    server.get('/user').then(function(response) {
      // TODO store it in sessionStorage
      dispatch(submitTokenResolve(response.data))
      browserHistory.push('/repos');

    }).catch(function (error) {
      console.log(error);
      dispatch(submitTokenReject(getErrorMessage(error)))
    });

    dispatch({
      type: SUBMIT_TOKEN,
    })
  }
}

export function submitTokenResolve (data) {
  return {
    type: SUBMIT_TOKEN_RESOLVE,
    data: data
  }
}

export function submitTokenReject (message) {
  return {
    type: SUBMIT_TOKEN_REJECT,
    message: message
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SUBMIT_TOKEN]: (state, action) => {
    return {
        ...state,
        validationMessage: null,
    }
  },
  [SUBMIT_TOKEN_RESOLVE]: (state, action) => {
    return {
        ...state,
        reposUrl: action.data.repos_url,
        login: action.data.login,
        validationMessage: null,
    }
  },
  [SUBMIT_TOKEN_REJECT]: (state, action) => {
    return {
        ...state,
        validationMessage: action.message
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  token: ''
}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
