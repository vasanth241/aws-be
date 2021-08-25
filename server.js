const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const upload = require('./middleware/file-upload');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(process.env.AWS_ACCESS_KEY_ID);
  res.send("Server Connected.");
  });

app.post('/api/v1/upload', upload.array('image', 1), (req, res) => {
  res.send({ image: req.file });
});

app.listen(80, () => {
  console.log('Server listening on port 3000!');
});
