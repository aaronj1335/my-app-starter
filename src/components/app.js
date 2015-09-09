import {Component, DOM} from 'react';
import {Router, Route, Link} from './../router';

import isBrowser from './../is-browser';
import store from './../data/store';
import auth from './../data/auth/actions';
import Login from './login';
import Container from './container';
import Sportsballs from './sportsballs';

if (isBrowser())
  var history = require('history/lib/createBrowserHistory')();

const {div} = DOM;

export default class App extends Component {
  constructor() {
    super();
    this.state = {isLoggedIn: store().getState().auth.isLoggedIn};
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  componentDidMount() {
    if (store().getState().auth.isLoggedIn == null)
      auth.checkIfLoggedIn();

    this._unsubscribe = store().subscribe(this.onAuthChange);
  }

  componentWillUnmount() {
    this._unsubscribe();
    delete this._unsubscribe;
  }

  onAuthChange() {
    const isLoggedIn = store().getState().auth.isLoggedIn;

    if (isLoggedIn !== this.state.isLoggedIn)
      this.setState({isLoggedIn});
  }

  render() {
    if (!isBrowser() || this.state.isLoggedIn == null)
      return div({}, 'loading...');

    if (this.state.isLoggedIn)
      return Router({history},
        Route({path: '/', component: Container},
          Route({path: 'sportsballs', component: Sportsballs})));
    else
      return Login();
  }
};
