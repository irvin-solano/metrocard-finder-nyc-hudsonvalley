// const path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: './client/app.jsx',
//   output: {
//     path: path.join(path.resolve(__dirname, 'public')),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//          exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: { presets: ['@babel/env', '@babel/preset-react'] },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   devtool: 'eval-cheap-module-source-map',
// };

const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
