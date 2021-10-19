import { legacyPlugin } from '@web/dev-server-legacy';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  nodeResolve: true,
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
    esbuildPlugin({
      jsx: true,
      jsxFactory: 'React.createElement',
      jsxFragment: 'Fragment',
      // loaders: { '.ts': 'js' },
      ts: true,
    }),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            // 导入依赖映射
            // 'lit/directives/class-map.js': '/node_modules/lit-html/directives/class-map.js',
            'lit/directives/class-map.js':
              '/__wds-outside-root__/2/node_modules/lit/node_modules/lit-html/directives/class-map.js',
            'lit/directives/style-map.js':
              '/__wds-outside-root__/2/node_modules/lit/node_modules/lit-html/directives/style-map.js',
            numeral: 'https://deno.land/x/denoforge@1.0.0/deps/numeral@2.0.6/numeral.js',
            '@sea-org/s-statistic': '/src/index.ts',
          },
        },
      },
    }),
  ],
};
