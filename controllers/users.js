const User = require('../models/user');

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch((err) => res.status(500).send({ message: `Error: ${err}` }));

module.exports.getUserById = (req, res) => User.findById(req.params.id)
  .orFail(() => {
    const error = new Error('No user found with that id');
    error.statusCode = 404;
    throw error;
  })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send({ message: `Error: ${err}` });
  });

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Error: ${err}` });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Error: ${err}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Error: ${err}` });
    });
};
