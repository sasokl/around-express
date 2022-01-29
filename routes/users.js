const usersRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../', '/data/users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500);
      res.send({ message: 'Requested resource not found' });
      return;
    }

    const users = JSON.parse(data);
    res.send(users);
  });
});

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500);
      res.send({ message: 'Requested resource not found' });
      return;
    }

    const users = JSON.parse(data);
    const reqUser = users.find((user) => user._id === req.params.id);
    res.status(!reqUser && 404);
    res.send(reqUser ? JSON.stringify(reqUser) : { message: 'User ID not found' });
  });
});

module.exports = usersRouter;
