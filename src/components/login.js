import {Component, DOM, createFactory} from 'react';

import store from './../data/store';
import {login} from './../data/auth/actions';
import './../style/mln2';

const {form, fieldset, input, button, div, p} = DOM;

class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onAuthStoreChange = this.onAuthStoreChange.bind(this);
    this.state = this.getStateFromAuthStore();
  }

  componentDidMount() {
    this._unsubscribe = store().subscribe(this.onAuthStoreChange);
  }

  componentWillUnmount() {
    this._unsubscribe();
    delete this._unsubscribe;
  }

  getStateFromAuthStore() {
    const authState = store().getState().auth;

    return {
      error: authState.error,
      pending: !!authState.loginRequest
    };
  }

  onAuthStoreChange() {
    // https://reactiflux.slack.com/archives/redux/p1440879642004255
    // for some reason i couldn't repro this in jsbin:
    // http://jsbin.com/qecimi/1/edit?js,output
    // it seems the App's render method runs before this callback runs in redux
    if (this._unsubscribe)
      this.setState(this.getStateFromAuthStore());
  }

  onSubmit(event) {
    const {target: {email: {value: eml}, password: {value: pass}}} = event;
    event.preventDefault();
    login(eml, pass);
  }

  renderErrorPlaceholder() {
    return div({className: 'p1 mb2'}, '\u00a0');
  }

  renderError() {
    const {state: {error: {message, response: {status}}}} = this;

    if (status === 403)
      var msg = 'The e-mail or password is incorrect.';
    else
      var msg = message;

    return div({
        className: 'p1 mb2 white bg-red rounded',
        role: 'alert',
      }, msg);
  }

  render() {
    return form({onSubmit: this.onSubmit},
      p({}, 'Please log in'),
      input({
        type: 'email',
        name: 'email',
        className: 'block col-12 mb2 field',
        placeholder: 'Email',
        autoFocus: true,
        disabled: this.state.pending
      }),
      div({className: 'clearfix mln2 mb2'},
        div({className: 'col col-9 px2'},
          input({
            type: 'password',
            name: 'password',
            className: 'block col-12 field',
            placeholder: 'Password',
            disabled: this.state.pending
          })),
        button({
          type: 'submit',
          className: 'col col-3 btn btn-primary',
          disabled: this.state.pending
        }, 'Log In')),
      this.state.error && this.renderError());
  }
}

export default createFactory(Login);
