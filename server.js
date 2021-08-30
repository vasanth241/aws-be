const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const upload = require('./middleware/file-upload');
const list = require('./middleware/file-list');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server Connected .");
  });

app.post('/api/v1/upload', upload.array('image', 1), (req, res) => {
  res.send({ image: req.file });
});

app.get('/api/v1/list', list);

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
