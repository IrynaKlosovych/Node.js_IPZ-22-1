const assert = require('assert');
const { factorial } = require('../functions');

describe('factorial function', () => {
  it('should return 120 for input 5', () => {
    assert.strictEqual(factorial(5), 120);
  });

  it('should return 720 for input 6', () => {
    assert.strictEqual(factorial(6), 720);
  });

  it('should return 1 for input 0', () => {
    assert.strictEqual(factorial(0), 1);
  });

  it('should return null for input -5', () => {
    assert.strictEqual(factorial(-5), null);
  });

  it('should return null for input -6', () => {
    assert.strictEqual(factorial(-6), null)
  });
});