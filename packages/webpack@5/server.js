const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const app = express();
const config = require('./webpack.config.js');
const complier = webpack(config);

app.use(webpackDevMiddleware(complier));

app.listen(3000, () => {
  console.log('Project is running at: 3000');
});
