import {readFileSync} from 'fs';

import {renderToString, createElement} from 'react';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import evaluate from 'eval';
import {last} from 'lodash';

export default function({templateCompiler, templateFileName, entry, outputFileName}) {
  return {
    apply: function(compiler) {
      compiler.plugin('emit', function(compilation, callback) {
        var assetsByChunkName = compilation
          .getStats()
          .toJson()
          .assetsByChunkName[entry];
        var asset = findAsset(entry, compilation, assetsByChunkName);
        var source = asset.source();
        var Component = evaluate(source, null, global, true);
        var componentHtml = renderToString(createElement(Component));
        var template = templateCompiler(readFileSync(templateFileName), 'utf-8');
        var html = template({
          componentHtml,
          compilation,
          assets: assetsByChunkName.reduce((assets, asset) => {
            const ext = last(asset.split('.'));

            assets[ext] = (assets[ext] || []).concat([asset])

            return assets;
          }, {})
        });

        compilation.assets[outputFileName] = {
          source: () => html,
          size: () => html.length
        };
        callback();
      });
    }
  }
};

function findAsset(entry, compilation, assetsByChunkName) {
  var asset = compilation.assets[entry];
  if (asset)
    return asset;

  if (!assetsByChunkName)
    return null;

  if (assetsByChunkName instanceof Array)
    assetsByChunkName = assetsByChunkName[0];

  return compilation.assets[assetsByChunkName];
};