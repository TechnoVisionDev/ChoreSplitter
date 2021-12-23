const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const dashboardRoutes = require('./routes/dashboard');
require('dotenv').config();

// Connect to MongoDB Database
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', console.error.bind(console, 'WARNING: Database Connection Error!'));
mongoose.connection.once('open', () => console.log('Database Connected'))

// Setup Express Application
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());                        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); // to support URL-encoded bodies

// Setup User Sessions
const oneWeek = 1000 * 60 * 60 * 24 * 7;
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + oneWeek,
        maxAge: oneWeek
    }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// Set Page Routes
app.use('/', authRoutes);
app.use('/group', groupRoutes);
app.use('/dashboard', dashboardRoutes);

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
    console.log(err);
    res.status(500).render('error');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
