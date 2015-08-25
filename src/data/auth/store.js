import {EventEmitter} from 'events';

import dispatcher from './../dispatcher';
import createAccessor from './../create-accessor';
import isBrowser from './../is-browser';

class AuthStore extends EventEmitter {
  constructor() {
    this.idx = dispatcher().register(this._dispatch.bind(this));
  }

  _dispatch(payload) {
    if (payload.
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }

  checkIsLoggedIn() {
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
