const { encryptMessage } = require('../../src/encryption/encryption');
test('encrypt', () => {
  const key = Buffer.alloc(32,0);
  expect(encryptMessage('hello',key)).not.toBe('hello');
});
