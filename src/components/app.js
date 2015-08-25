import {Component, DOM} from 'react';

import isBrowser from './../is-browser';

import auth from './../data/auth/store';

const {div} = DOM;

export default class App extends Component {
  constructor() {
    super();
    this.state = {isLoggedIn: auth().isLoggedIn()};
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  componentDidMount() {
    if (auth().isLoggedIn() == null)
      auth().checkIsLoggedIn();

    auth().on('change', this.onAuthChange);
  }

  componentWillUnmount() {
    auth().removeListener('change', this.onAuthChange);
  }

  onAuthChange() {
    this.setState({isLoggedIn: auth().isLoggedIn()});
  }

  render() {
    if (!isBrowser() || this.state.isLoggedIn == null)
      return div({}, 'loading...');

    if (this.state.isLoggedIn)
      return div({}, 'content');
    else
      return div({}, 'login form');
  }
};
