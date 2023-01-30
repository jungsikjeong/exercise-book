const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const loginPassport = require('../middleware/loginPassport');

const { body, check, validationResult } = require('express-validator');

const User = require('../models/User');

var pattern1 = /[0-9]/; //숫자
var pattern2 = /[a-zA-Z]/; //영어
var pattern3 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
var pattern4 = /[~!@#\#$%<>^&*]/; //특수문자

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

// 로그인

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    { successRedirect: '/', failWithError: true },
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      // loginPassport.js에서 인증 실패한 메시지가 나옴
      if (info) {
        return res.status(401).json(info);
      }

      if (!user) {
        return res.status(401).json({
          errors: [{ msg: 'authentication fail!' }],
        });
      }

      return res.send({ success: true, message: 'authentication succeeded' });
    }
  )(req, res, next);
});

router.get('/register', (req, res) => {
  res.render('register.ejs');
});

// 회원가입
router.post(
  '/register',
  [
    check('userId', '아이디는 5글자,영어 혹은 숫자만 입력해주세요')
      .isLength(5)
      .withMessage('아이디는 5글자여야합니다.')
      .if(body('userId').exists())
      .custom((userId) => {
        if (pattern3.test(userId) || pattern4.test(userId)) {
          return false;
        }
        return true;
      })
      .withMessage('아이디는 영어 혹은 숫자만 입력해주세요'),

    check('name', '이름은 최소2글자, 최대5글자입니다.')
      .not()
      .isEmpty()
      .isLength({
        min: 2,
        max: 5,
      }),
    check('password', '6자 이상의 비밀번호를 입력해주세요').isLength(6),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, name, password } = req.body;

    try {
      // 사용자 확인
      let user = await User.findOne({ userId });
      let userName = await User.findOne({ name });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: '사용자 아이디가 이미 존재합니다.' }] });
      }

      if (userName) {
        return res
          .status(400)
          .json({ errors: [{ msg: '사용자 이름이 이미 존재합니다.' }] });
      }

      user = new User({
        userId,
        name,
        password,
      });

      // 비밀번호 암호화
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
