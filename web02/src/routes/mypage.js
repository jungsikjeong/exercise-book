const express = require('express');
const router = express.Router();

const isLogin = require('../middleware/auth');

const User = require('../models/User');
const Post = require('../models/Post');

router.get('/mypage', isLogin, async (req, res) => {
  res.render('mypage.ejs');
});

router.post('/mypage', isLogin, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user }).sort({ date: -1 });
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
