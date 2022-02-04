const mongoose = require('mongoose');

const avatarRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => avatarRegex.test(v),
      message: (props) => `${props.value} is invalid link`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
