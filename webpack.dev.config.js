const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './src/index.js'),
    ],
    vendors: [
      'classnames',
      'react',
      'react-dom',
      'react-redux',
      'redux',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel',
    }],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
