import {reduce} from 'lodash';
import LineToLineMappedSource from 'webpack-core/lib/LineToLineMappedSource';

export default function(transform) {
  return function() {
    this.plugin('compilation', function(compilation) {
      compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
        compilation.assets = reduce(compilation.assets, (assets, asset, name) => {
          if (/\.css$/.test(name)) {
            var source = asset.source();
            assets[name] = new LineToLineMappedSource(transform(source), name, source);
          }

          return assets;
        }, compilation.assets);

        callback();
      });
    });
  }
}
