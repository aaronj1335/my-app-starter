import {createFactory} from 'react';
import {Router, Route, Link} from 'react-router';

export default {
  Router: createFactory(Router),
  Route: createFactory(Route),
  Link: createFactory(Link)
};
