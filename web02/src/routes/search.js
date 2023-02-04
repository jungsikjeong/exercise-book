const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.post('/search', async (req, res) => {
  if (req.body.result) {
    const post = await Post.find({ category: req.body.result })
      .sort({ _id: 1 })
      .exec();

    return res.status(200).json({ post });
  } else {
    const post = await Post.find({ category: req.query.value })
      .sort({ _id: 1 })
      .exec();

    return res.status(200).json({ post });
  }
});
router.get('/search', async (req, res) => {
  res.render('search.ejs');
});

module.exports = router;
