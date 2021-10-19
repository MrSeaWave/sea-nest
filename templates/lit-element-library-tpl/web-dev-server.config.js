import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  nodeResolve: true,
  preserveSymlinks: true,
  plugins: [
    esbuildPlugin({
      jsx: true,
      jsxFactory: 'React.createElement',
      jsxFragment: 'Fragment',
      ts: true,
    }),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            // 导入依赖映射
            'lit/directives/class-map.js':
              '/__wds-outside-root__/2/node_modules/lit-html/directives/class-map.js',
            'lit/directives/style-map.js':
              '/__wds-outside-root__/2/node_modules/lit-html/directives/style-map.js',
          },
        },
      },
    }),
  ],
};
