import APIError from './error';

import config from './../../config';

const defaults = {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  }
};

export default function apiCall(path, opts, ...args) {
  /* path = config.api.baseURL + path; */
  opts = {...defaults, ...opts};

  return fetch.call(this, path, opts, ...args)
    .then(response => {
      if (response.status >= 300)
        return response.text()
          .then(text => {
            throw new APIError(response, text);
          });
      else
        return response.json()
    });
};

// in case the caller needs to selectively override headers
apiCall.defaults = defaults;
