const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.config');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

const app = express();
const compiler = webpack(config);

const jhipsterServiceUrl = 'http://localhost:8081';
app.use(history());
app.use(proxy('/api', {target: jhipsterServiceUrl, changeOrigin: true}));
app.use(proxy('/management', {target: jhipsterServiceUrl, changeOrigin: true}));
app.use(proxy('/v2/api-docs', {target: jhipsterServiceUrl, changeOrigin: true}));

app.use(express.static(path.resolve(__dirname, './static')));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
