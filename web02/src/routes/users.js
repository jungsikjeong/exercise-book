const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

router.get('/logion', (req, res) => {
  res.render('login.ejs');
});

router.post('/logion', (req, res) => {
  res.render('login.ejs');
});

router.get('/register', function (req, res) {
  res.render('register.ejs');
});

module.exports = router;
