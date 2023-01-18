module.exports = {
  entry: './src/index.js',
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                  {
                      loader: 'babel-loader',
                      
                  },
              ]
          },
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
              test: /\.(svg)$/,
              use: [
                  {
                      loader: 'raw-loader',
                  }
              ]
          }
      ]
  },
  output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js',
      library: 'TextAlignment',
      libraryTarget: 'umd',
      libraryExport: 'default'
  }
};