import {Component, DOM, createFactory} from 'react';
import {Link} from './../router';

const {header, div, nav} = DOM;

export default class Nav extends Component {
  render() {
    return header({className: 'navbar navbar-static-top'},
      div({className: 'clearfix'}), // idk this is how the bs 4 docs do it
      div({className: 'navbar-toggleable-xs-collapse', 'aria-expanded': false},
        nav({className: 'nav navbar-nav'},
          Link({className: 'nav-item nav-link', to: '/'},
            'Pineapples'),
          Link({className: 'nav-item nav-link', to: '/sportsballs'},
            'Sportsballs'))));
  }
};
