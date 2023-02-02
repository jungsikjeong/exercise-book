const multer = require('multer');

const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname.slice(0, 53) + 'public/image');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + file.originalname);
  },
});

module.exports = multer({
  storage: storage,

  limits: { fileSize: 5 * 1024 * 1024 },
});
