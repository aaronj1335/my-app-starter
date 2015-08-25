/**
 * @module config
 *
 * @description application configuration used while compiling, serving files
 * in the dev environment, and in the browser at runtime
 */
export default {
  // to be used during development and when this app is deployed
  csp: `script-src       'self';
        style-src        'self';
        img-src          'self';
        media-src        'self';
        connect-src      'self';
        base-uri         none;
        child-src        none;
        font-src         none;
        form-action      none;
        frame-ancestors: none;
        object-src:      none;
        `,

  api: {
    // when the browser makes API requests, those should be rooted at the
    // following URL
    baseURL: '/api',
  },

  dev: {
    serverPort: 8080,

    // when doing development, API requests should route to the following host
    apiHost: 'https://example.com:1337',
  }
};
