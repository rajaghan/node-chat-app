require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
  generateMessage
} = require('./utils/message');
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  //listen to incoming event 'createMessage'
  socket.on('createMessage', (newMsg) => {
    //emit an event and pass data to all connected users
    io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));

    // {
    //   //emit an event and pass data to all connected users except the emitter
    //   // socket.broadcast.emit('newMessage', {
    //   from: newMsg.from,
    //   text: newMsg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

});

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
});
