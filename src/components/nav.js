import {Component, DOM, createFactory} from 'react';
import {Link} from './../router';

const {header, nav} = DOM;
const classes = 'btn py2 regular col col-2';
const activeClasses = ' h3';
const isRoot = () => location.pathname === '/';

export default class Nav extends Component {
  render() {
    return header({className: 'clearfix white bg-black'},
      nav({className: 'container'},
        Link({
            to: '/',
            className: classes + (isRoot()? activeClasses : '')
          }, 'Pineapples'),
        Link({
            to: '/sportsballs',
            className: classes,
            activeClassName: activeClasses
          }, 'Sportsballs')));
  }
};
