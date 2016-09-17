var express = require('express');
var bodyParser = require('body-parser');
var open = require('open'); //for opening in browser
var data = {};
var port=3333;
express()
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .get('/api/data', (req, res) => res.json(data))
  .post('/api/data', (req, res) => res.json(data = req.body))
  .get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
  .listen(3333,  function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
