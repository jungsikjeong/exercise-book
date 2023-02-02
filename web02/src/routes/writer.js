const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer');
const isLogin = require('../middleware/auth');

const Post = require('../models/Post');
const User = require('../models/User');

router.get('/writer', isLogin, (req, res) => {
  res.render('writer.ejs');
});

router.post('/writer', isLogin, async (req, res) => {
  const { titleText, textBody, categoryValue, fileName } = req.body;
  console.log(req.body);

  try {
    const user = await User.findById(req.user).select('-password');
    const post = new Post({
      title: titleText ? titleText : '',
      text: textBody,
      category: categoryValue,
      image: fileName,
      user: req.user._id,
    });

    user.posts.push(post);

    await user.save();
    await post.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  '/upload',
  isLogin,
  upload.single('file'),
  async (req, res, next) => {
    try {
      res.json({
        success: true,
        fileInfo: req.file,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
