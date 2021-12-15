const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('home', { header: 'Home Page'});
})

app.get('/auth', (req, res) => {
    res.send("LOGGED IN!");
})

app.get('*', (req, res) => {
    res.render('error404', { url: req.originalUrl});
})

app.listen(port, () => {
    console.log(`ChoreSplitter listening at http://localhost:${port}`);
})