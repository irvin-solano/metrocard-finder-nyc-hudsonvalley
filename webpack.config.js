const path = require('path');

module.exports = {
  entry: './client/app.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
};