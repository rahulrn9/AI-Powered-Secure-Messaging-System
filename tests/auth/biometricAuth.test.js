const authenticate = require('../../src/auth/biometricAuth');
test('auth fn', () => expect(typeof authenticate).toBe('function'));
