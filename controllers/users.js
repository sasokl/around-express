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
  .catch((err) => res.status(err.statusCode ? err.statusCode : 500).send({ message: `Error: ${err}` }));

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.name}` }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.name}` }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.name}` }));
};
