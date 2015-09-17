import store from './../store';
import apiCall from './../../api/call';

export default {
  login: function(username, password) {
    var state = store().getState();

    if (state.auth.loginRequest)
      return state.auth.loginRequest;

    var loginRequest = apiCall('/login.json', {
        method: 'POST',
        body: JSON.stringify({email: username, password})
      })
      .then(result => {
        store().dispatch({type: 'AUTH_LOGIN_SUCCESS'});
        return result;
      })
      .catch(error => {
        store().dispatch({type: 'AUTH_LOGIN_FAILURE', error: error});
        return error;
      });

    store().dispatch({type: 'AUTH_LOGIN_REQUEST', loginRequest});

    return loginRequest;
  },

  checkIfLoggedIn: function() {
    var state = store().getState();

    if (state.auth.isLoggedIn != null)
      return Promise.resolve(state.auth.isLoggedIn);

    var checkRequest = fetch('/is-logged-in.json')
      .then(response => response.json())
      .then(isLoggedIn => {
        store().dispatch({type: 'AUTH_CHECK_SUCCESS', isLoggedIn});
        return isLoggedIn;
      })
      .catch(error => {
        store().dispatch({type: 'AUTH_CHECK_FAILURE', error: error});
        return error;
      })

    store().dispatch({type: 'AUTH_CHECK_REQUEST', checkRequest});

    return checkRequest;
  }
};
