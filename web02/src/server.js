require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const loginPassport = require('./middleware/loginPassport');
const { userInfo } = require('./middleware/auth');
const methodOverride = require('method-override');

const User = require('./models/User');

const app = express();

connectDB();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

loginPassport();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
  res.render('index.ejs');
});

app.post('/isuser', async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user).select('-password');

    return res.json({ success: true, user });
  } else {
    return res.json({ success: false });
  }
});

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }

    res.redirect('/');
  });
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/search'));
app.use('/', require('./routes/writer'));
app.use('/', require('./routes/list'));
app.use('/', require('./routes/mypage'));

app.listen(process.env.PORT, function () {
  console.log('listening on port 8080');
});
