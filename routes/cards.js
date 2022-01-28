const cardsRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

cardsRouter.get('/cards', (req, res) => {
  const dataPath = path.join(__dirname, '../', '/data/cards.json');
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(404);
      res.send({ message: 'Requested resource not found' });
      return;
    }

    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = cardsRouter;
