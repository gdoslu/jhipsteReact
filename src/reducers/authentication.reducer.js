import { browserHistory } from 'react-router';

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

const GET_SESSION = 'authentication/GET_SESSION';
const GET_SESSION_SUCCESS = 'authentication/GET_SESSION_SUCCESS';
const GET_SESSION_FAIL = 'authentication/GET_SESSION_FAIL';

const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGOUT_FAIL';

const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  account: {},
  errorMessage: null, // Errors returned from server side
  redirectMessage: null,
  showModalLogin: false
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...initialState,
        errorMessage: action.error.data
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    case GET_SESSION:
      return {
        ...state,
        isFetching: true
      };
    case GET_SESSION_SUCCESS:
      const isAuthenticated = action.result.data ? action.result.data.activated : false;
      return {
        ...initialState,
        isAuthenticated,
        account: action.result.data
      };
    case GET_SESSION_FAIL:
      return {
        ...initialState,
        errorMessage: action.error.data,
      };
    case ERROR_MESSAGE:
      return {
        ...initialState,
        redirectMessage: action.message
      };
    default:
      return state;
  }
}

export function displayAuthError(message) {
  return {type: ERROR_MESSAGE, message};
}

export function login(username, password, rememberMe = true) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/authenticate', {username, password, rememberMe}),
    afterSuccess: (dispatch, getState, response) => {
      localStorage.setItem('id_token', response.headers['authorization']);
      const routingState = getState().routing.locationBeforeTransitions.state || {};
      browserHistory.push(routingState.nextPathname || '');
      dispatch(getSession());
    }
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/api/account'),
    afterSuccess: () => {
      localStorage.removeItem('id_token');
      browserHistory.push('');
    }
  };
}

export function getSession() {
  return {
    types: [GET_SESSION, GET_SESSION_SUCCESS, GET_SESSION_FAIL],
    promise: (client) => client.get('/api/account')
  };
}

export function redirectToLoginWithMessage(messageKey) {
  return (dispatch, getState) => {
    dispatch(displayAuthError(messageKey));
    const currentPath = getState().routing.locationBeforeTransitions.pathname;
    browserHistory.replace({pathname: '/login', state: {nextPathname: currentPath}});
  }
}
