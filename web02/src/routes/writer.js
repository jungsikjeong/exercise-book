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

  try {
    const user = await User.findById(req.user).select('-password');

    const post = new Post({
      title: titleText ? titleText : '',
      text: textBody,
      category: categoryValue,
      image: fileName,
      user: req.user,
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

router.get('/edit/:id', isLogin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user);

    if (post.user.toString() === user._id.toString()) {
      return res.render('edit.ejs', { post });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/edit/:id', isLogin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user);

    if (post.user.toString() === user._id.toString()) {
      return res.status(200).json({ post });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/edit/:id', isLogin, async (req, res) => {
  const { titleText, textBody, categoryValue, fileName } = req.body;

  try {
    const user = await User.findById(req.user).select('-password');

    if (user._id.toString() !== req.user) {
      return res
        .status(404)
        .json({ success: false, message: '유저가 일치하지 않습니다.' });
    }

    const post = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: titleText ? titleText : '',
          text: textBody,
          category: categoryValue,
          image: fileName,
        },
      }
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
