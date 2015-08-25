import {Component, DOM, createFactory} from 'react';

import authStore from './../data/auth/store';
import authActions from './../data/auth/actions';

const {form, fieldset, input, button} = DOM;

class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const {target: {email: {value: eml}, password: {value: pass}}} = event;
    event.preventDefault();
    console.log('in there');
    authActions().login(eml, pass);
  }

  render() {
    return form({onSubmit: this.onSubmit, ref: 'form'},
      fieldset({className: 'form-group'},
        input({
          type: 'email',
          name: 'email',
          className: 'form-control',
          placeholder: 'Email',
          autoFocus: true
        })),
      fieldset({className: 'form-group'},
        input({
          type: 'password',
          name: 'password',
          className: 'form-control',
          placeholder: 'Password'
        })),
      button({type: 'submit', className: 'btn btn-primary'}, 'Submit'));
  }
}

export default createFactory(Login);
