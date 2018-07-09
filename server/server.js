require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //listen to incoming event 'createMessage'
  socket.on('createMessage', (newMsg) => {
    //emit an event and pass data to all connected users
    io.emit('newMessage', {
      from: newMsg.from,
      text: newMsg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

});

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
});
