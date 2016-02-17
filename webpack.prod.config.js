var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
    vendors: [
      'classnames',
      'react',
      'react-dom',
      'react-redux',
      'redux'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};
