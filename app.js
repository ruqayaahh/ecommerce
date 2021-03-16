const express = require('express');
const logger = require('morgan');
const { userRouter, productRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) => res.json({ welcome: 'hello' }));
app.use(userRouter);
app.use(productRouter);

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:${4000}`);
});
