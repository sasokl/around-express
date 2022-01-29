const express = require('express');
const helmet = require('helmet');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

app.use('/', usersRoute);
app.use('/', cardsRoute);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
