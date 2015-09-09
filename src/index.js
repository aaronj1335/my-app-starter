import {render, createElement} from 'react';

import './basscss';
import isBrowser from './is-browser';
import App from './components/app';

if (isBrowser())
  render(createElement(App), document.body);

// we need to export this for the ReactToHtmlPlugin. the plugin will render
// whatever we export here as the `html` value in the template
export default App;
