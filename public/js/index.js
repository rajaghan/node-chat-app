var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(newMsg) {
  console.log('New message', newMsg);
  var li = jQuery('<li></li>');
  li.text(`${newMsg.from}: ${newMsg.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Mike',
//     text: 'holla'
//   },
//   function(ack) {
//     console.log(ack);
//   }
// );

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
