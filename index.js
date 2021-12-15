// Setup Express
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set 'public' and 'views' folders
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Home page redirect
app.get('/', (req, res) => {
    res.render('home', { header: 'Home Page'});
})

// Features page redirect
app.get('/features', (req, res) => {
    res.render('features');
})

// Login and Registration
app.get('/auth', (req, res) => {
    res.send("Successfully logged in!");
})

// Error 404 page redirect
app.get('*', (req, res) => {
    res.render('error', { url: req.originalUrl});
})

app.listen(port, () => {
    console.log(`ChoreSplitter listening at http://localhost:${port}`);
})