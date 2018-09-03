const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const router = require('./router');

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);


server.listen(9000, err => {
  if (err) console.log(error);
  console.log('app listening on port 9000');
});
