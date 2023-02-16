const express = require('express')
var bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const verify = require('./middleware/verify')
const User = require("./model/user");
const socketIO = require('socket.io');
const http = require('http')



const book = require('./routes/books')
const user = require('./routes/users')
const error404 = require('./middleware/err404')
const path = require('path')

const PORT = process.env.port || 3000
const app = express()
const server = http.Server(app);
const io = socketIO(server);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())
const options = {
  usernameField: "username",
  passwordField: "password",
}
passport.use('local', new LocalStrategy(options, verify))
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.find({ _id: id });
    cb(null, user)
  } catch (error) {
    if (err) { return cb(err) }
  }
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.redirect('/books')
})

app.use('/public', express.static(__dirname + '/public'))
app.use('/api/user', user)
app.use('/books', book)
app.use(error404)

io.on('connection', (socket) => {
  const {id} = socket;
  // console.log(`Socket connected: ${id}`);

  // работа с комнатами
  const {roomName} = socket.handshake.query;
  // console.log(`Socket roomName: ${roomName}`);
  socket.join(roomName);
  socket.on('message-to-room', (msg) => {
      msg.type = `room: ${roomName}`;
      socket.to(roomName).emit('message-to-room', msg);
      socket.emit('message-to-room', msg);
  });

  socket.on('disconnect', () => {
      // console.log(`Socket disconnected: ${id}`);
  });
});

server.listen(PORT)
console.log(`Server start on port ${PORT}`)