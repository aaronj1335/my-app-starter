#!/usr/bin/env babel-node

import {extname, join} from 'path';
import url from 'url';
import http from 'http';

import connect from 'connect';
import connectLogger from 'connect-logger';
import proxyMiddleware from 'proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './../webpack.config';
import config from '../config';

function hasExtension(req) {
  const pathname = url.parse(req.url).pathname;
  return !!extname(pathname);
}

function pushStateReWriter(req, res, next) {
  const pathname = url.parse(req.url).pathname;

  if (!hasExtension(req) && pathname !== '/') {
    console.log(`re-routing ${pathname} -> /`);
    req.url = '/';
  }

  next();
}

function addCSPHeader(req, res, next) {
  if (!hasExtension(req))
    res.setHeader('Content-Security-Policy', csp);

  next();
}

const {dev: {apiHost, serverPort}, api: {baseURL}, csp} = config;
const compiler = webpack(webpackConfig);

const webpackMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  outputPath: '/',
  filename: webpackConfig.output.filename,
  hot: false,
  contentBase: join(__dirname, '..'),
  noInfo: false,
  quiet: false,
  stats: {
    colors: true,
    cached: false,
  },
});
const apiProxyMiddleware = proxyMiddleware(url.parse(apiHost + baseURL));
const middlewares = connect()
  .use(connectLogger())
  .use(baseURL, apiProxyMiddleware)
  .use(pushStateReWriter)
  .use(addCSPHeader)
  .use(webpackMiddleware);

http.createServer(middlewares).listen(serverPort);
console.log(`dev server listening on port ${serverPort}`);
