const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('post', PostSchema);
