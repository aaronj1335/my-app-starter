import {join} from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {template} from 'lodash';
import webpack from 'webpack';

import html from './lib/html';

const isDev = process.env.NODE_ENV !== 'production';

import {readFile} from 'fs';

module.exports = {
  // without this, failures to compile es6 will get silently squashed and
  // reported as a missing module
  /* bail: true, */

  // we're hashing the output filename to enable long-term HTTP caching in
  // production. the HTMLWebpackPlugin still needs to be able to reference this
  // entry point though, so we can't just specify `entry: './src/index.js'`,
  // instead we use the object literal syntax so we can referency this entry
  // point by name (i.e. `main`).
  //
  // additionally, we need the leading './', i think because if we exclude
  // that, webpack looks for the `src` package in `node_modules` or something
  entry: {
    main: './src/index.js'
  },

  output: {
    filename: isDev? 'index.js' : '[hash].js',
    path: join(__dirname, 'dist'),

    // we need it to export this somehow so that when the HTMLWebpackPlugin
    // renders the app at build time it can import it. if we weren't using
    // HTMLWebpackPlugin, we could leave this out.
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },

      isDev && {
        test: /\.js$/,
        loader: 'source-map!babel-loader',
        exclude: /node_modules/
      },

      !isDev && {
        test: /\.js$/,
        loader: 'transform/cacheable?envify!babel-loader',
        exclude: /node_modules/
      },

      !isDev && {test: /node_modules.*\.js$/, loader: 'transform/cacheable?envify'}
    ].filter(l => !!l)
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    extensions: ['', '.js', '.scss']
  },

  plugins: [
    new ExtractTextPlugin(isDev? 'style.css' : '[hash].css', {allChunks: true}),
    isDev? null : new webpack.optimize.UglifyJsPlugin({minimize: true}),
    html({
      templateCompiler: template,
      templateFileName: 'src/index.html',
      entry: 'main',
      outputFileName: 'index.html'
    }),

    // TODO: remove this when we've got a real api
    isDev? {
      apply: function(compiler) {
        compiler.plugin('emit', function(compilation, callback) {
          function finish() {
            if (compilation.assets['is-logged-in.json'] && compilation.assets['login.json'])
              callback();
          }

          readFile('test/mock/is-logged-in.json', 'utf-8', (e, s) => {
            compilation.assets['is-logged-in.json'] = {
              source: () => s,
              size: () => s.length
            };

            finish();
          });

          readFile('test/mock/login.json', 'utf-8', (e, s) => {
            compilation.assets['login.json'] = {
              source: () => s,
              size: () => s.length
            };

            finish();
          });
        });
      }
    } : null
  ].filter(p => !!p),

  devtool: isDev? 'source-map' : null
};

