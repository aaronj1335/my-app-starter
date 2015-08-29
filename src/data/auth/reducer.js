export default function(state = {}, action) {
  const prev = state.auth || {};
  var auth;

  // initialize the `auth` object
  if (!auth)
    auth = {};

  if (action.type === 'AUTH_LOGIN_REQUEST')
    auth = {...prev, loginRequest: action.loginRequest, error: null};

  if (action.type === 'AUTH_LOGIN_SUCCESS')
    auth = {...prev, loginRequest: null, isLoggedIn: true};

  if (action.type === 'AUTH_LOGIN_FAILURE')
    auth = {
      ...prev,
      loginRequest: null,
      isLoggedIn: false,
      error: action.error
    };


  if (action.type === 'AUTH_CHECK_REQUEST')
    auth = {...prev, checkRequest: action.checkRequest, error: null};

  if (action.type === 'AUTH_CHECK_SUCCESS')
    auth = {...prev, checkRequest: null, isLoggedIn: action.isLoggedIn};

  if (action.type === 'AUTH_CHECK_FAILURE')
    auth = {
      ...prev,
      loginRequest: null,
      isLoggedIn: false,
      error: action.error
    };


  if (auth)
    return {...state, auth};
  else
    return state;
};
