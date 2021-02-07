const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// io.listen(server);
const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log("success"))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send("hii"));
app.use('/users', require("./routes/users"));

const users = {};
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
    console.log(users);
  });
  socket.on('typing', data => {
    socket.broadcast.emit('typing-message', { user: users[socket.id], data: data});
  });
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });
  socket.on('disconnect', han => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

const PORT = 3000;
http.listen(PORT , console.log(`serving on port ${PORT}`));