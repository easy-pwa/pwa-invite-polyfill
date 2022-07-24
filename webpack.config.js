const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'production',
  entry: {
    'index': './src/index.ts',
  },
  output: {
    filename: 'pwa-install-polyfill.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'pwaInstallPolyfill'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.d.ts', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head', // insert style tag inside of <head>
              injectType: 'singletonStyleTag' // this is for wrap all your style in just one style tag
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "raw-loader"
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    host: '0.0.0.0',
    static: [
      path.join(__dirname, 'example'),
    ],
  },
};

module.exports = [config];
