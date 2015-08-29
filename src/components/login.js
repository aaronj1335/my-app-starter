import {Component, DOM, createFactory} from 'react';

import store from './../data/store';
import {login} from './../data/auth/actions';

const {form, fieldset, input, button, div} = DOM;

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
    if (this._unsubscribe)
      this.setState(this.getStateFromAuthStore());
  }

  onSubmit(event) {
    const {target: {email: {value: eml}, password: {value: pass}}} = event;
    event.preventDefault();
    login(eml, pass);
  }

  render() {
    return form({onSubmit: this.onSubmit, ref: 'form'},
      fieldset({className: 'form-group'},
        input({
          type: 'email',
          name: 'email',
          className: 'form-control',
          placeholder: 'Email',
          autoFocus: true,
          disabled: this.state.pending
        })),
      fieldset({className: 'form-group'},
        input({
          type: 'password',
          name: 'password',
          className: 'form-control',
          placeholder: 'Password',
          disabled: this.state.pending
        })),
      button({
        type: 'submit',
        className: 'btn btn-primary form-group',
        disabled: this.state.pending
      }, 'Submit'),
      this.state.error && div({
        className: 'form-group alert alert-danger',
        role: 'alert',
      }, this.state.error.message));
  }
}

export default createFactory(Login);
