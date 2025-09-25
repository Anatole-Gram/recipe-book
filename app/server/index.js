const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./models")

const app = express();
let port = 3000

/* Db sync */
db.sequelize.sync({force: true}).then(()=>{console.log("Drop and re-sync db.")});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send("<h1>Hello World!<h1/>"));
app.get('/get', (req, res) => {
    let mes = {message: "Hello World!"};
    let data = JSON.stringify(mes);
    res.send(data)
});
app.listen(port, () => console.log(`Server initialized on: http://localhost:${port} // ${new Date()}`));