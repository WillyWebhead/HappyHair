const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const appDirectory = path.resolve(__dirname, '..');

// Only include packages that ship raw JSX/TS (not pre-compiled ESM).
// @react-navigation/* v7 ship pre-compiled ESM — running Babel on them breaks
// the modules by mixing CJS exports with webpack's ESM handling.
const compileNodeModules = [
  'react-native',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-gesture-handler',
  'use-sync-external-store',
  'use-latest-callback',
  'nanoid',
  'fast-deep-equal',
  'escape-string-regexp',
].map(m => path.resolve(appDirectory, `node_modules/${m}`));

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production';

  return {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: path.resolve(appDirectory, 'index.js'),
    output: {
      path: path.resolve(appDirectory, 'dist'),
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      publicPath: '/',
      clean: true,
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
      open: false,
    },
    resolve: {
      // Force CJS builds for dual-format (ESM+CJS) packages.
      // Without this, webpack 5 resolves the "import" condition → ESM files,
      // then Babel also converts them to CJS, producing "exports is not defined".
      conditionNames: ['browser', 'require', 'default'],
      alias: {
        'react-native$': 'react-native-web',
        'react-native-reanimated': path.resolve(__dirname, 'reanimated-stub.js'),
        // Override CardContent to use flex:1/overflow:hidden so the card is
        // bounded by the viewport and ScrollView components work correctly.
        [path.resolve(appDirectory, 'node_modules/@react-navigation/stack/lib/module/views/Stack/CardContent.js')]: path.resolve(__dirname, 'CardContentOverride.js'),
      },
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        // Allow ESM packages to use bare relative imports without extensions
        {
          test: /\.m?js$/,
          resolve: { fullySpecified: false },
        },
        {
          test: /\.(tsx?|jsx?)$/,
          include: [
            path.resolve(appDirectory, 'src'),
            path.resolve(appDirectory, 'App.tsx'),
            path.resolve(appDirectory, 'index.js'),
            ...compileNodeModules,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
              plugins: ['react-native-web'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg|ttf|otf|woff2?)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'manifest.json'), to: '.' },
          {
            from: path.resolve(__dirname, 'icons'),
            to: 'icons',
            noErrorOnMissing: true,
          },
        ],
      }),
      ...(isProd
        ? [
            new GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              runtimeCaching: [
                {
                  urlPattern: /^https?.*/,
                  handler: 'NetworkFirst',
                  options: { cacheName: 'happy-hair-cache' },
                },
              ],
            }),
          ]
        : []),
    ],
  };
};
