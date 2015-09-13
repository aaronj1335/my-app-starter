import {Component, createFactory, DOM} from 'react';

import './style';

const {div} = DOM;

class LoadingIndicator extends Component {
  render() {
    return div({className: 'loading-indicator'});
  }
};

export default createFactory(LoadingIndicator);
