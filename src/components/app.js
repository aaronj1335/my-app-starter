import {Component, DOM, createFactory} from 'react';

import isBrowser from './../is-browser';
import authStore from './../data/auth/store';
import authActions from './../data/auth/actions';
import Login from './login';

const {div} = DOM;

class App extends Component {
  constructor() {
    super();
    this.state = {isLoggedIn: authStore().isLoggedIn()};
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  componentDidMount() {
    if (authStore().isLoggedIn() == null)
      authActions().checkIsLoggedIn();

    authStore().on('change', this.onAuthChange);
  }

  componentWillUnmount() {
    authStore().removeListener('change', this.onAuthChange);
  }

  onAuthChange() {
    this.setState({isLoggedIn: authStore().isLoggedIn()});
  }

  render() {
    if (!isBrowser() || this.state.isLoggedIn == null)
      return div({}, 'loading...');

    if (this.state.isLoggedIn)
      return div({}, 'content');
    else
      return Login();
  }
};

export default createFactory(App);
