const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Post = require('../models/Post');

router.get('/list', async (req, res) => {
  try {
    if (req.query.value) {
      const posts = await Post.find({ category: req.query.value }).sort({
        date: -1,
      });
      res.json(posts);
    } else {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    }
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
