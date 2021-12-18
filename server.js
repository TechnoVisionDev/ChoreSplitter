// Setup Express
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

// Get MongoDB models
const User = require('./models/user');
const Group = require('./models/group');

// Setup MongoDB database
const mongoose = require('mongoose');
const setupDatabase = async () => await mongoose.connect('');
setupDatabase().catch(err => console.log(err));

// Set 'public' and 'views' folders
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

// Enable support for form parsing
const bodyParser = require('body-parser')
app.use(bodyParser.json());                        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); // to support URL-encoded bodies

//session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Home page redirect
app.get('/', (req, res) => {
    res.render('home', {session: req.session});
})

// Features page redirect
app.get('/features', (req, res) => {
    res.render('features', {session: req.session});
})

// Login page redirect
app.get('/auth', (req, res) => {
    session = req.session;
    if (!session.email) {
        res.render('login', {session: req.session});
    } else {
        res.render('/', {session: req.session});
    }
})

// Registration authentication
app.post('/register', async (req, res) => {
    try {
        // Form validation
        const {email, password, verify, name, avatar, terms} = req.body;
        if (!email || !name || !password || !verify || !terms) {
            throw new Error('*You must fill out all fields to register.');
        }
        if (password !== verify) {
            throw new Error('*The passwords you entered do not match.');
        }

        // Create new user document
        const user = new User({ email : email, password : password, name : name, avatar : avatar});
        try { await user.save() }
        catch (e) { throw new Error('*That email address is already in use.'); }

        // Create session and redirect
        session = req.session;
        session.email = email;
        res.redirect('/');
    } catch (e) {
        res.render('login', {registerError: e.message});
    }
})

// Login authentication
app.post('/login', async (req, res) => {
    try {
        // Form validation
        const {email, password} = req.body;
        if (!email || !password) {
            throw new Error('*You must fill out all fields to login.');
        }

        // Verify user with database
        let user = await User.findOne({email : email, password : password}).lean();
        if (!user) { throw new Error('*Invalid email and password.'); }

        // Create session and redirect
        session = req.session;
        session.email = email;
        res.redirect('/');
    } catch (e) {
        res.render('login', {loginError: e.message});
    }
})

// Error 404 page redirect
app.get('*', (req, res) => {
    res.render('error', { url: req.originalUrl});
})

app.listen(port, () => {
    console.log(`ChoreSplitter listening at http://localhost:${port}`);
})