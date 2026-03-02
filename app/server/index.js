const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
db.sequelize.sync({force: true}).then(() => {console.log('#SEQUELIZE: Drop and re-syn db.')})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', require('./routes/recipes'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server initialized on http://localhost:${PORT}`));