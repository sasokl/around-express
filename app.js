const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
// eslint-disable-next-line max-len
// The 'localhost' not working on node js version 17.x (my version), so I found a solution by replacing it with 127.0.0.1
mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(`ErrorFU: ${err}`);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

app.use((req, res, next) => {
  req.user = {
    _id: '61fc60d885d535b1df4f67f3', // paste the _id of the test user created in the previous step
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
