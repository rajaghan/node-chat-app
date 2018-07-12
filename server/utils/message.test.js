var expect = require('expect');

var {
  generateMessage
} = require('./message');

describe('Generate Message', () => {
  it('should generate correct message object', () => {
    var from = 'raja';
    var text = 'hello how are you today?';
    var res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
  });
});
