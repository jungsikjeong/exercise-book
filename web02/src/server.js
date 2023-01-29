require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/posts'));

app.listen(process.env.PORT, function () {
  console.log('listening on port 8080');
});
