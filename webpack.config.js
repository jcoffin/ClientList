const path = require('path');
const { VueLoaderPlugin } = require('vue-loader-v16');

module.exports = {

  entry: './client/src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'vue-loader-v16'
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]

}