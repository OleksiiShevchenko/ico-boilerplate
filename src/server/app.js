const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const router = require('./router');

app.use('/', router);


server.listen(3000, err => {
  if (err) console.log(error);
  console.log('app listening on port 3000');
});
