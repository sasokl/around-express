const Card = require('../models/card');

module.exports.getCards = (req, res) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch((err) => res.status(500).send({ message: `Error: ${err}` }));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ message: `Error: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => Card.findByIdAndDelete(req.params.cardId)
  .orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error;
  })
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send({ message: `Error: ${err}` });
  });

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error;
  })
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send({ message: `Error: ${err}` });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
  .orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error;
  })
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send({ message: `Error: ${err}` });
  });
