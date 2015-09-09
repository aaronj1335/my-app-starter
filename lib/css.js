import postcss from 'postcss';
import customProperties from 'postcss-custom-properties';
import {reduce} from 'lodash';
import LineToLineMappedSource from 'webpack-core/lib/LineToLineMappedSource';

export default function() {
  this.plugin('compilation', function(compilation) {
    compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
      compilation.assets = reduce(compilation.assets, (assets, asset, name) => {
        if (/\.css$/.test(name)) {
          var resolvedCss = postcss()
            .use(customProperties())
            .process(asset.source())
            .css;
          assets[name] = new LineToLineMappedSource(resolvedCss, name, asset.source());
        } else
          assets[name] = asset;

        return assets;
      }, compilation.assets);

      callback();
    });
  });
}
