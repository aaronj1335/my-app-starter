import {render} from 'react';

import App from './components/app';
import './customized-bootstrap';
import isBrowser from './is-browser';

if (isBrowser())
  render(App(), document.body);

// we need to export this for the ReactToHtmlPlugin. the plugin will render
// whatever we export here as the `html` value in the template
export default App;
