import store from './store';
import createAccessor from './../create-accessor';

class AuthActions {
  constructor(store) {
    this.store = store();
  }

  login() {
  }
}

export default createAccessor(AuthActions);
