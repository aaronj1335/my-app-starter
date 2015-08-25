import {EventEmitter} from 'events';

import dispatcher from './../dispatcher';
import createAccessor from './../../create-accessor';
import isBrowser from './../../is-browser';
import {LOGIN, CHECK} from './constants';

class AuthStore extends EventEmitter {
  constructor() {
    super();
    this.idx = dispatcher().register(this._dispatch.bind(this));
  }

  _dispatch({action: {type, user, pass}}) {
    if (type === LOGIN)
      this._login(user, pass);
    else if (type === CHECK)
      this._checkIsLoggedIn();
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  pendingLogin() {
    return this._pendingLogin;
  }

  loginError() {
    return this._loginError;
  }

  _login(user, pass) {
    if (!this._pendingLogin) {
      this._pendingLogin = fetch('/login.json', {
          method: 'POST',
          body: encodeURIComponent(user) + '&' + encodeURIComponent(pass)
        })
        .then(response => response.json())
        .then(result => {
          this._loginResult = result;
          this._pendingLogin = null;
          this.emit('change');
        })
        .catch(e => {
          this._loginError = e;
          this._pendingLogin = null;
          this.emit('change');
        });

      this._loginError = null;
      this.emit('change');
    }

    return this._pendingLogin;
  }

  _checkIsLoggedIn() {
    return this.isLoggedIn() != null?
      Promise.resolve(this.isLoggedIn()) :
      this._fetchIsLoggedIn();
  }

  _fetchIsLoggedIn() {
    if (!this._fetchIsLoggedInPromise)
      this._fetchIsLoggedInPromise = fetch('/is-logged-in.json')
        .then(response => response.json())
        .then(result => {
          this._isLoggedIn = result;
          this.emit('change');

          return result;
        });

    return this._fetchIsLoggedInPromise;
  }
}

export default createAccessor(AuthStore);
