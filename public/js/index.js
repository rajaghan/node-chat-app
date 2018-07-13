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

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

var sendLocation = jQuery('#send-location');

sendLocation.on('click', function() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported in your browser")
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert("Unable to fetch geolocation");
  })
});
