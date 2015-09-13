import {reduce} from 'lodash';
import SourceMapSource from 'webpack-core/lib/SourceMapSource';

export default function(transform) {
  return function() {
    this.plugin('compilation', function(compilation) {
      compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
        compilation.assets = reduce(compilation.assets, (assets, asset, name) => {
          if (/\.css$/.test(name)) {
            var source = asset.source();
            assets[name] = new SourceMapSource(transform(source), name, asset.map(), source);
          }

          return assets;
        }, compilation.assets);

        callback();
      });
    });
  }
}
