import store from './store';
import {LOGIN, CHECK} from './constants';
import createAccessor from './../../create-accessor';
import dispatcher from './../dispatcher';

class AuthActions {
  constructor() {
    this.store = store();
  }

  login(user, pass) {
    dispatcher().dispatch({action: {type: LOGIN, user, pass}})
  }

  checkIsLoggedIn() {
    dispatcher().dispatch({action: {type: CHECK}});
  }
}

export default createAccessor(AuthActions);
