import {EventEmitter} from 'events';
import isBrowser from './../is-browser';

class AuthStore extends EventEmitter {
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

let _instance;

function accessor() {
  if (!_instance)
    _instance = new AuthStore();

  return _instance;
};

accessor.AuthStore = AuthStore;

if (process.env.NODE_ENV !== 'production' && isBrowser())
  window.auth = accessor;

export default accessor;
