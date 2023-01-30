const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

module.exports = function () {
  // 세션 저장 코드
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // 세션 해석 코드 , req.user
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id });

    if (user) {
      done(null, user.id);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
      },
      async (userId, password, done) => {
        const user = await User.findOne({ userId });

        if (!user || user === null) {
          return done(null, false, {
            errors: [{ msg: '사용자가 존재하지 않습니다.' }],
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, {
            errors: [{ msg: '비밀번호가 다릅니다.' }],
          });
        }

        return done(null, user);
      }
    )
  );
};
