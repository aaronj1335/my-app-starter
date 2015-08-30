import {Component, createFactory, DOM} from 'react';

const Nav = createFactory(require('./nav'));
const Pineapples = createFactory(require('./pineapples'));

const {div} = DOM;

export default class Container extends Component {
  render() {
    return div({},
      Nav(),
      div({className: 'container'},
        div({className: 'row'},
          div({className: 'col-md-12'},
            this.props.children || Pineapples()))));
  }
};
