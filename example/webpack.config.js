const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 需要 link
const { TailwindCssWebpackPlugin } = require('@sprit/tailwindcss-webpack-plugin');

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new TailwindCssWebpackPlugin(),
  ],
  devServer: {
    static: ['./dist'],
    port: 8000,
    hot: true
  }
};
