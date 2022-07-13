const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('HELLO BACKEND');
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
