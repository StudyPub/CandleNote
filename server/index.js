const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const mongoose = require('mongoose');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');

const authRoutes = require('./routes/auth-routes.js');
const userRoutes = require('./routes/user-routes.js');
const webshot = require('webshot');

const app = express();
const server = require('http').createServer(app); // socket stuff
const io = require('socket.io').listen(server); // socket stuff

app.use(bodyParser.json());
const DIST_DIR = path.join(__dirname, '../client/dist');
// const SRC_DIR = path.join(__dirname,  "../client/src/");
const port = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
  secret: 'shakeweight',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  name: 'candleNote',
}));

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [keys.session.cookieKey],
// }));

app.use(passport.initialize());

app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connecting to mongodb');
});

/* ----------- GET Handlers --------- */
// app.get('/user', (req, res) => {
//   console.log('You are logged in this is your user profile: ', req.user);
//   console.log('authenticated at /user? : ', req.isAuthenticated())

// });

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

/* --------- POST Handlers ----------- */

app.post('/makePDF', (req, res) => {
  const myUrl = req.body.tab_url;
  const title = JSON.stringify(Date.now());

  // defaut webshot options
  const options = {
    streamType: 'pdf',
    windowSize: {
      width: 1024,
      height: 786,
    },
    shotSize: {
      width: 'all',
      height: 'all',
    },
  };

  // webshot wraps phantomjs and provides a simple API
  // phantomjs is essentially a web browser with no GUI
  webshot(myUrl, `PDFs/${title}.pdf`, options, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

/* ----------- Sockets ------------ */

io.sockets.on('connection', (socket) => {
  console.log('socket connected: ', socket.id);

  socket.on('send message', (data) => {
    io.sockets.emit('new message', data);
  });

});

/* ----------- API Routes ------------ */


/* -------- Initialize Server -------- */

server.listen(port, () => {
  console.info(`🌎  Server now running on port ${port}.  🌎`);
});

