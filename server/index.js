const express = require('express');
const app = express();
const port = 3000;
const db = require('./database')

app.use(express.static('./public'));

app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
})