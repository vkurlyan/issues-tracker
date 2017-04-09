import createGithubInstance from '../../../utils/createGithubInstance'

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
      dispatch(submitTokenResolve(response.data))

    }).catch(function (error) {
      let message = 'Bas request';

      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message
      }

      dispatch(submitTokenReject(message))
    });

    return {
      type: SUBMIT_TOKEN,
      token: token
    }
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
  [SUBMIT_TOKEN_RESOLVE]    : (state, action) => {
    return {
        ...state,
        reposUrl: action.data.repos_url,
        login: action.data.login,
        validationMessage: null,
    }
  },
  [SUBMIT_TOKEN_REJECT]    : (state, action) => {
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
