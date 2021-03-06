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
let chatHistory = [];

io.on('connection', (socket) => {
    // Join specific room and send chat history
    socket.on('joinRoom', (group) => {
        socket.join(group);
        socket.emit('chats', chatHistory[group]);
    });

    // Accept and broadcast incoming chats
    socket.on('submit', ({group, message}) => {
        if (group in chatHistory) {
            chatHistory[group].push(message);
        } else {
            chatHistory[group] = [message];
        }
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
