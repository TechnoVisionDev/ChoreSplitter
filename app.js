const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();

// Connect to MongoDB Database
mongoose.connect(process.env.DATABASE);

// Setup Express Application
const app = express();
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());                        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); // to support URL-encoded bodies

// Setup User Sessions
const oneWeek = 1000 * 60 * 60 * 24 * 7;
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
app.use(session({
    secret,
    cookie: { maxAge: oneWeek},
    saveUninitialized: false,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// Set Page Routes
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/features', (req, res) => {
    res.render('features');
})

app.all('*', (req, res, next) => {
    res.status(404).render('error', { url: req.originalUrl});
    next();
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    res.status(statusCode).render('error', { url: '/home' })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`ChoreSplitter listening at http://localhost:${port}`);
})
