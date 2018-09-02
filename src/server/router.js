const express = require('express');
const router = express.Router();


router.get('/', (req, res) => renderPage(res));


router.get('/api/v1', (req, res) => {
  res.send('api');
});



module.exports = router;


function renderPage (res) {
  return res.status(200).send(`
    <!doctype html>
    <html>
      <head>
      </head>
      <body>
        <div id="root" style="width: 100%; height: 100%; position: relative;">
          Hello world
        </div>
      </body>
    </html>`);
}