const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [

      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        type: 'asset/resource',
      },


    ],
  },
};