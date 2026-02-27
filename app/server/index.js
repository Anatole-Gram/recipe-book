const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', require('./routes/recipes'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server initialized on http://localhost:${PORT}`));