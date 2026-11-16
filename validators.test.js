const { isValidPasswordLength, isValidPassword } =
  require('./validators');

// Regression suite: the REQ-6 tests from Part 1
describe('REQ-6 length (existing)', () => {
  test.each([
    ['below min (7)',  'a'.repeat(7),  false],
    ['at min (8)',     'a'.repeat(8),  true],
    ['at max (20)',    'a'.repeat(20), true],
    ['above max (21)', 'a'.repeat(21), false],
  ])('%s', (label, pw, expected) => {
    expect(isValidPasswordLength(pw))
      .toBe(expected);
  });
});

// TDD: written BEFORE isValidPassword() existed
describe('REQ-7 needs a digit (new)', () => {
  test.each([
    ['no digit',         'Password!', false],
    ['one digit',        'Password1', true],
    ['digit, too short', 'Pass1',     false],
    ['digit, max (20)', 'x'.repeat(19)+'7', true],
  ])('%s', (label, pw, expected) => {
    expect(isValidPassword(pw)).toBe(expected);
  });
});
