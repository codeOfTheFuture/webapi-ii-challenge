const express = require('express');

const dbRouter = require('./data/dbRouter');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Users API</h2>
  `);
});

app.use('/api/posts', dbRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
