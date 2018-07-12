var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(newMsg) {
  console.log('New message', newMsg);
});

socket.emit('createMessage', {
    from: 'Mike',
    text: 'holla'
  },
  function(ack) {
    console.log(ack);
  }
);
