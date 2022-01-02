if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const dashboardRoutes = require('./routes/dashboard');
const leaderboardRoutes = require('./routes/leaderboard');
const chatRoutes = require('./routes/chat');
const settingsRoutes = require('./routes/settings');

// Connect to MongoDB Database
const mongoUrl = process.env.DATABASE;
mongoose.connect(mongoUrl);
mongoose.connection.on('error', console.error.bind(console, 'WARNING: Database Connection Error!'));
mongoose.connection.once('open', () => console.log('Database Connected'))

// Setup Express Application
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(helmet({contentSecurityPolicy: false}));
app.use(bodyParser.json());                        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); // to support URL-encoded bodies

// Setup User Sessions
const oneWeek = 1000 * 60 * 60 * 24 * 7;
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
app.use(session({
    store: MongoStore.create({ mongoUrl }),
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

// Setup Group Chat
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let history = [{
    name: 'Zander',
    avatar: 'data:image/png;base64,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',
    msg: 'Welcome to the group chat bro!'
}]

io.on('connection', (socket) => {
    // Join specific room and send chat history
    socket.on('joinRoom', (group) => {
        socket.join(group);
        socket.emit('chats', history);
    });

    // Accept and broadcast incoming chats
    socket.on('submit', ({group, message}) => {
        io.to(group).emit('message', message);
    });
});

// Set Page Routes
app.use('/', authRoutes);
app.use('/group', groupRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/chat', chatRoutes);
app.use('/settings', settingsRoutes);

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
server.listen(port, () => {
    console.log(`Serving on port ${port}`)
});
