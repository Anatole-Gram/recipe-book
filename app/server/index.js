const express = require('express');
const app = express();
let port = 3000
if (process.env.NODE_ENV === 'development') {
    console.log('in development.');
} else {
    console.log('in production.');
}
app.get('/', (req, res) => res.send("<h1>Hello World!<h1/>"));
app.get('/get', (req, res) => {
    let mes = {message: "Hello World!"};
    let data = JSON.stringify(mes);
    res.send(data)
});
app.listen(port, () => console.log(`Server initialized on: http://localhost:${port} // ${new Date()}`));