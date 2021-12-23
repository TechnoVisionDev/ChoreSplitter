const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const Group = require('./models/group');
const authenticator = require('./routes/auth')
require('dotenv').config();

// Setup Express Application
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());                        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); // to support URL-encoded bodies

// Setup Session Middleware
const oneWeek = 1000 * 60 * 60 * 24 * 7;
app.use(session({
    secret: "thisisnotagoodsecretkey",
    cookie: { maxAge: oneWeek },
    saveUninitialized: false,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// Connect to MongoDB Database
mongoose.connect(process.env.DATABASE);

// Set Page Routes
app.use('/', authenticator.router);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/features', (req, res) => {
    res.render('features');
})

app.use((req, res) => {
    res.status(404).render('error', { url: req.originalUrl});
})

app.listen(port, () => {
    console.log(`ChoreSplitter listening at http://localhost:${port}`);
})
