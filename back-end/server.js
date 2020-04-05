const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', async (req, res) => {
  res.send('Hello, World!')
})

app.listen(3001, () => console.log('Server listening on port 3001!'));