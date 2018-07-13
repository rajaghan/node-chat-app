var expect = require('expect');

var {
  generateMessage,
  generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'raja';
    var text = 'hello how are you today?';
    var res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var from = 'Admin';
    var latitude = 1;
    var longitude = 1;
    var expectedUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    var locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(expectedUrl);
    expect(locationMessage.createdAt).toBeA('number');
  });
});
